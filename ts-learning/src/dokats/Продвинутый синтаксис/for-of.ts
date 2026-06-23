// Цикл for...of
// Конспект по статье https://doka.guide/js/for-of/

// =============================================
// 1. Что это и зачем
// =============================================
// for...of - цикл для обхода ЗНАЧЕНИЙ итерируемой коллекции.
// На каждой итерации в переменную попадает само значение, а НЕ ключ/индекс.
//
// Что значит "итерируемый"? Это коллекции, у которых есть встроенный
// механизм перебора: Array, String, Set, Map, TypedArray, NodeList,
// arguments, генераторы.
// Обычный объект {} итерируемым НЕ является и в for...of сам по себе
// не работает - нужны Object.keys/values/entries.

// Синтаксис:
//   for (const item of iterable) { ... }

// =============================================
// 2. С массивом
// =============================================
// Самый частый случай. Получаем значение, а не индекс.

const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit); // "apple", "banana", "cherry"
}

// Если нужен ИНДЕКС вместе со значением - используй entries():
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit); // 0 "apple", 1 "banana", 2 "cherry"
}
// Здесь index - number (а не string как было в for...in!)

// =============================================
// 3. Со строкой
// =============================================
// Строка тоже итерируема - перебираются символы.
// Корректно работает с emoji и составными символами (см. spread.ts).

const word = "hello";
for (const ch of word) {
  console.log(ch); // "h", "e", "l", "l", "o"
}

// =============================================
// 4. С Set
// =============================================
// Set - коллекция уникальных значений.
// for...of идеально для перебора - это его родная коллекция.

const tags = new Set(["js", "ts", "react", "ts"]); // дубль "ts" удалится
for (const tag of tags) {
  console.log(tag); // "js", "ts", "react"
}

// =============================================
// 5. С Map
// =============================================
// Map - коллекция пар [ключ, значение].
// Без entries() обход дает ПАРЫ - сразу можно деструктурировать.

const userRoles = new Map<string, string>([
  ["anna", "admin"],
  ["boris", "user"],
  ["vova", "guest"],
]);

for (const [name, role] of userRoles) {
  console.log(`${name} - ${role}`);
}
// anna - admin
// boris - user
// vova - guest

// Только ключи:
for (const name of userRoles.keys()) {
  console.log(name);
}

// Только значения:
for (const role of userRoles.values()) {
  console.log(role);
}

// =============================================
// 6. С обычным объектом - НАПРЯМУЮ НЕЛЬЗЯ
// =============================================
// Обычный объект {} не итерируемый. Этот код упадет:
//   const obj = { a: 1, b: 2 };
//   for (const x of obj) { ... }  // Ошибка: obj is not iterable

// Решение - превратить объект в массив пар через Object.entries:
const obj = { a: 1, b: 2, c: 3 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} = ${value}`);
}
// a = 1
// b = 2
// c = 3

// =============================================
// 7. break и continue работают
// =============================================
// В отличие от forEach, в for...of можно прерывать цикл.

const numbers = [1, 2, 3, 4, 5, 6, 7];

// break - выйти из цикла:
for (const n of numbers) {
  if (n > 4) break;
  console.log(n); // 1, 2, 3, 4
}

// continue - пропустить итерацию:
for (const n of numbers) {
  if (n % 2 === 0) continue; // пропускаем четные
  console.log(n); // 1, 3, 5, 7
}

// Это важное преимущество перед forEach, который break не поддерживает.

// =============================================
// 8. for...of vs for...in vs forEach
// =============================================
// Полная сравнительная таблица:

// for...in - КЛЮЧИ/индексы (строки), включая унаследованные.
//            Только для объектов-словарей.
// for...of - ЗНАЧЕНИЯ итерируемой коллекции.
//            Для массивов, строк, Set, Map.
// forEach  - метод массива. Дает (value, index, array) колбэку.
//            Нельзя прервать через break, нельзя await внутри.

const arr = ["a", "b", "c"];

console.log("for...in:");
for (const i in arr) console.log(i); // "0", "1", "2"  (строки!)

console.log("for...of:");
for (const v of arr) console.log(v); // "a", "b", "c"

console.log("forEach:");
arr.forEach((v, i) => console.log(i, v)); // 0 a, 1 b, 2 c

// Запоминалка:
//   in  - "что В объекте есть" -> ключи
//   of  - "что вылетает ИЗ коллекции" -> значения

// =============================================
// 9. Когда что использовать
// =============================================
// Массив -> for...of (или forEach, если не нужен break/await)
// Map/Set -> for...of - других нормальных вариантов нет
// Объект-словарь -> Object.entries + for...of, либо for...in
// Тебе нужен индекс массива как number -> for...of + .entries()
// Тебе нужно прервать обход -> ТОЛЬКО for...of (break)
// Тебе нужен async/await внутри -> ТОЛЬКО for...of

// Пример с await - почему это важно:
const fetchUser = async (id: number): Promise<string> => `user-${id}`; // упрощенно

const userIds = [1, 2, 3];

// Так работает - await встанет на каждой итерации:
const loadUsers = async (): Promise<void> => {
  for (const id of userIds) {
    const u = await fetchUser(id);
    console.log(u);
  }
};
loadUsers();

// В forEach так писать НЕЛЬЗЯ - колбэки вызовутся параллельно,
// и await внутри не задержит внешний код.

// =============================================
// 10. TS-специфика: типизация переменной цикла
// =============================================
// В отличие от for...in (где ключ всегда string), for...of выводит
// настоящий тип значения коллекции.

const scores: number[] = [10, 20, 30];
for (const s of scores) {
  // тип s: number  - корректно
  console.log(s * 2);
}

const mixedSet = new Set<string | number>(["a", 1, "b", 2]);
for (const v of mixedSet) {
  // тип v: string | number - объединение
  console.log(typeof v, v);
}

// Object.entries возвращает [string, V][] - ключ всегда string.
// Если нужен литеральный тип ключа - нужен явный cast (как в for...in).

const config = { host: "localhost", port: 8080, debug: true };
for (const [key, value] of Object.entries(config)) {
  // key: string (а не "host" | "port" | "debug")
  // value: string | number | boolean - объединение типов значений
  console.log(key, value);
}

// =============================================
// 11. TS-специфика: tuple в for...of
// =============================================
// При обходе массива tuple'ов TS правильно деструктурирует типы.

const pairs: [string, number][] = [
  ["age", 25],
  ["score", 100],
];

for (const [label, value] of pairs) {
  // label: string, value: number
  console.log(label.toUpperCase(), value + 1);
}

// =============================================
// 12. Частые паттерны
// =============================================

// Найти первый подходящий элемент и выйти:
const findFirstEven = (arr: number[]): number | undefined => {
  for (const n of arr) {
    if (n % 2 === 0) return n;
  }
  return undefined;
};
console.log(findFirstEven([1, 3, 4, 5, 6])); // 4

// Накопление с условиями (фильтр+сумма за один проход):
const sumPositive = (arr: number[]): number => {
  let total = 0;
  for (const n of arr) {
    if (n > 0) total += n;
  }
  return total;
};
console.log(sumPositive([1, -2, 3, -4, 5])); // 9

// Обход Map по парам (типичный случай):
type CartItem = { qty: number; price: number };
const cart = new Map<string, CartItem>([
  ["apple", { qty: 3, price: 50 }],
  ["bread", { qty: 1, price: 100 }],
]);

let cartTotal = 0;
for (const [name, item] of cart) {
  cartTotal += item.qty * item.price;
  console.log(`${name}: ${item.qty} x ${item.price}`);
}
console.log("total:", cartTotal); // 250

// =============================================
// Итог
// =============================================
// - for...of перебирает ЗНАЧЕНИЯ итерируемой коллекции
// - Работает с массивами, строками, Set, Map, NodeList
// - С обычным объектом - через Object.entries/keys/values
// - Поддерживает break, continue и await (forEach не поддерживает)
// - В TS правильно выводит тип значения - в отличие от for...in
// - Для индекса массива как числа - используй arr.entries()
