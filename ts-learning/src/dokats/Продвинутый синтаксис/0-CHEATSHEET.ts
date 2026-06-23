// =================================================================
// ШПАРГАЛКА ПО ПРОДВИНУТОМУ СИНТАКСИСУ
// Быстрая выжимка по всем темам раздела. Для Codewars и реальных задач.
// =================================================================

// =================================================================
// 1. ТЕРНАРНЫЙ ОПЕРАТОР  (полный файл: ternary-operator.ts)
// =================================================================
// СИНТАКСИС: условие ? значение_true : значение_false

const n1 = 10;
const parity = n1 % 2 === 0 ? "Even" : "Odd";

// В стрелочной функции:
const sign = (x: number): string => (x > 0 ? "+" : x < 0 ? "-" : "0");

// Вложенный (для нескольких диапазонов):
const grade =
  85 >= 90 ? "A" :
  85 >= 80 ? "B" :
  85 >= 70 ? "C" : "F";

// НЕ путать с || и ??:
//   value || "def"   - "def", если value ложное (включая 0, "", false)
//   value ?? "def"   - "def", только если value null или undefined

console.log(parity, sign(5), grade);

// =================================================================
// 2. SPREAD / REST  (полный файл: spread.ts)
// =================================================================
// SPREAD - распаковка ("..." справа или в вызове)

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];           // [1, 2, 3, 4, 5]  - объединение
const arrCopy = [...arr1];               // [1, 2, 3]  - копия массива

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };          // { a:1, b:2, c:3 }
const obj3 = { ...obj1, b: 99 };         // { a:1, b:99 }  - переопределение

Math.max(...arr1);                       // 3  - распаковка в аргументы

const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]  - убрать дубли
console.log(arr2, obj3, unique);

// REST - сборка ("..." слева или в параметрах)

const sumAll = (...nums: number[]): number => nums.reduce((s, n) => s + n, 0);
sumAll(1, 2, 3, 4);                      // 10

const [head, ...tail] = [10, 20, 30];    // head=10, tail=[20,30]
const { x: xx, ...rest } = { x: 1, y: 2, z: 3 }; // xx=1, rest={y:2,z:3}
console.log(head, tail, xx, rest);

// =================================================================
// 3. ДЕСТРУКТУРИЗАЦИЯ  (полный файл: destructuring.ts)
// =================================================================
// ОБЪЕКТ: { имя_поля } слева от =

const user = { name: "Аня", age: 25, role: "admin" };
const { name, age } = user;                              // name="Аня", age=25
const { name: userName } = user;                         // переименование
const { name: nm, salary = 0 } = user;                   // дефолт

// МАССИВ: [ имя ] слева от =, важен ПОРЯДОК

const [first, second] = [10, 20, 30];                    // first=10, second=20
const [, , third] = [10, 20, 30];                        // пропуск через запятые
const [a = 0, b = 0] = [1];                              // дефолты: a=1, b=0

// В ПАРАМЕТРАХ ФУНКЦИИ - супер-частый паттерн

type Point = { x: number; y: number };
const draw = ({ x, y }: Point): string => `${x},${y}`;
draw({ x: 1, y: 2 });

// В КОЛБЭКАХ map/filter

const people = [{ name: "Аня", age: 25 }, { name: "Боря", age: 30 }];
people.map(({ name }) => name);                          // ["Аня", "Боря"]
people.filter(({ age }) => age > 26);

// ВЛОЖЕННАЯ

const data = { user: { profile: { city: "Минск" } } };
const { user: { profile: { city } } } = data;            // city="Минск"
console.log(name, userName, nm, first, second, third, a, b, city);

// =================================================================
// 4. FOR...IN  (полный файл: for-in.ts)
// =================================================================
// Перебор КЛЮЧЕЙ объекта (key - ВСЕГДА string).
// Для массивов НЕ использовать.

const dict = { apple: 50, bread: 100, milk: 80 };

let total = 0;
for (const key in dict) {
  total += dict[key];  // OK с типом Record<string, number>
}
console.log(total); // 230

// В TS ключ - string, не литералы. Для индексации точного типа:
//   obj[key as keyof typeof obj]

// =================================================================
// 5. FOR...OF  (полный файл: for-of.ts)
// =================================================================
// Перебор ЗНАЧЕНИЙ итерируемой коллекции.
// Поддерживает break, continue, await.

const items = ["a", "b", "c"];

for (const item of items) {
  console.log(item);
}

// Индекс + значение:
for (const [i, item] of items.entries()) {
  console.log(i, item);  // i: number
}

// Объект через entries:
for (const [k, v] of Object.entries({ a: 1, b: 2 })) {
  console.log(k, v);
}

// break/continue:
for (const n of [1, 2, 3, 4, 5]) {
  if (n === 3) continue;
  if (n === 5) break;
  console.log(n); // 1, 2, 4
}

// СВОДНАЯ ТАБЛИЦА:
//   for...in   - КЛЮЧИ (для объектов-словарей)
//   for...of   - ЗНАЧЕНИЯ (для массивов, Set, Map, строк)
//   forEach    - метод массива, нет break/await

// =================================================================
// 6. ИТЕРАТОРЫ И ГЕНЕРАТОРЫ  (полный файл: iterator.ts)
// =================================================================
// Генератор - простой способ создать итератор.
// function* + yield. Каждый yield "отдает" значение и паузится.

function* range(from: number, to: number): Generator<number> {
  for (let i = from; i <= to; i++) yield i;
}

console.log([...range(1, 5)]);     // [1, 2, 3, 4, 5]
for (const n of range(10, 12)) {
  console.log(n);                  // 10, 11, 12
}

// Бесконечный генератор (память не съест - ленивые вычисления):
function* counter(): Generator<number> {
  let i = 0;
  while (true) yield i++;
}

let cnt = 0;
for (const n of counter()) {
  if (cnt++ >= 3) break;
  console.log(n); // 0, 1, 2
}

// Принимать ЛЮБОЕ итерируемое в функции:
const sumIterable = (xs: Iterable<number>): number => {
  let s = 0;
  for (const x of xs) s += x;
  return s;
};
sumIterable([1, 2, 3]);          // массив
sumIterable(new Set([1, 2, 3])); // Set
sumIterable(range(1, 3));        // генератор

// =================================================================
// 7. DATE  (полный файл: date.ts)
// =================================================================
// СОЗДАНИЕ:
const d1 = new Date();                       // сейчас
const d2 = new Date("2026-06-23");           // из ISO-строки
const d3 = new Date(2026, 5, 23);            // МЕСЯЦЫ С НУЛЯ! 5 = ИЮНЬ
const d4 = new Date(Date.now());             // из timestamp

// ПОЛУЧЕНИЕ:
d1.getFullYear();    // год
d1.getMonth();       // месяц (0-11!)
d1.getDate();        // день месяца (1-31)
d1.getDay();         // день недели (0=ВС)
d1.getHours();
d1.getTime();        // timestamp в мс

// ИЗМЕНЕНИЕ (мутирует!):
d1.setDate(d1.getDate() + 1);    // завтра
d1.setMonth(0);                  // январь

// ФОРМАТИРОВАНИЕ:
d1.toISOString();                            // "2026-06-23T11:30:00.000Z"
d1.toLocaleDateString("ru-RU");              // "23.06.2026"
d1.toLocaleString("ru-RU");                  // "23.06.2026, 14:30:00"

// СРАВНЕНИЕ:
d2 > d3;                          // OK через timestamp
d2.getTime() === d3.getTime();    // правильное равенство, === НЕ работает!

// РАЗНИЦА В ДНЯХ:
const days = (b: Date, a: Date) =>
  Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

console.log(d1, d2, d3, d4, days(d2, d3));

// =================================================================
// БЫСТРЫЕ ПОДСКАЗКИ ДЛЯ CODEWARS
// =================================================================

// Сложить все числа массива:
[1, 2, 3].reduce((s, n) => s + n, 0);

// Найти максимум:
Math.max(...[1, 2, 3]);

// Убрать дубли:
[...new Set([1, 1, 2, 3])];

// Перевернуть массив:
[1, 2, 3].reverse();

// Перевернуть строку:
[...("hello")].reverse().join("");

// Подсчитать вхождения символов:
const count: Record<string, number> = {};
for (const ch of "hello") count[ch] = (count[ch] ?? 0) + 1;
console.log(count); // { h:1, e:1, l:2, o:1 }

// Проверить четность:
const isEven = (x: number): boolean => x % 2 === 0;

// Сумма цифр числа:
const digitSum = (n: number): number =>
  [...String(Math.abs(n))].reduce((s, d) => s + Number(d), 0);
digitSum(123); // 6

// Превратить объект в массив пар и обратно:
const pairs = Object.entries({ a: 1, b: 2 });          // [["a",1],["b",2]]
const back = Object.fromEntries(pairs);                // { a:1, b:2 }
console.log(pairs, back);

// Поменять местами две переменные:
let aa = 1, bb = 2;
[aa, bb] = [bb, aa];                                    // aa=2, bb=1
console.log(aa, bb);

// =================================================================
// КОГДА ЧТО ВЫБРАТЬ - ШПАРГАЛКА
// =================================================================

// "Если/иначе один результат" -> ТЕРНАРКА
// "Копия массива/объекта" -> SPREAD ([...arr] / {...obj})
// "Слить два массива/объекта" -> SPREAD
// "Достать поля объекта" -> ДЕСТРУКТУРИЗАЦИЯ
// "Перебрать массив" -> for...of или forEach или .map/.filter/.reduce
// "Перебрать объект" -> for...of + Object.entries
// "Нужен индекс как number" -> for...of + .entries()
// "Нужно прервать перебор" -> for...of + break
// "Перебрать с await" -> for...of + await (НЕ forEach!)
// "Сделать счетчик/ленивую последовательность" -> генератор function*
// "Универсальная функция для коллекций" -> параметр Iterable<T>
