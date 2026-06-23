// Цикл for...in
// Конспект по статье https://doka.guide/js/for-in/

// =============================================
// 1. Что это и зачем
// =============================================
// for...in - цикл для обхода КЛЮЧЕЙ (имен свойств) объекта.
// На каждой итерации в переменную попадает имя свойства в виде СТРОКИ.

// Синтаксис:
//   for (const key in object) { ... }

const cat = {
  name: "Борис",
  color: "red",
  age: 8,
};

for (const key in cat) {
  // key - строка с именем свойства: "name", "color", "age"
  console.log(`${key} -> ${cat[key as keyof typeof cat]}`);
}
// name -> Борис
// color -> red
// age -> 8

// =============================================
// 2. Ключ ВСЕГДА строка
// =============================================
// Даже если ключ в объекте задан числом - в for...in он будет строкой.

const scores = { 1: 100, 2: 90, 3: 80 };
for (const key in scores) {
  console.log(typeof key, key); // string "1", string "2", string "3"
}

// =============================================
// 3. Что именно перебирается
// =============================================
// for...in обходит ПЕРЕЧИСЛЯЕМЫЕ свойства:
// - собственные свойства объекта
// - унаследованные свойства из прототипа (если они enumerable)
//
// Встроенные методы (toString, hasOwnProperty и т.п.) - неперечисляемые,
// поэтому в обычной работе они не попадаются. Но если кто-то добавил
// свойство в Object.prototype - оно вылезет в каждом for...in.

// Пример с наследованием:
const parent = { species: "кот" };
const baby: { name: string; species?: string } = Object.create(parent);
baby.name = "Барсик";

for (const key in baby) {
  console.log(key); // "name", потом "species" (из прототипа!)
}

// Чтобы перебирать ТОЛЬКО собственные свойства - проверка через hasOwn:
for (const key in baby) {
  if (Object.hasOwn(baby, key)) {
    console.log("свой:", key);
  }
}
// "свой: name"  - species отфильтровался

// =============================================
// 4. ВАЖНО: НЕ используй for...in для массивов!
// =============================================
// Массив - это объект, у которого ключи это индексы.
// for...in для массива РАБОТАЕТ, но это плохая практика, потому что:

const arr = ["a", "b", "c"];
for (const i in arr) {
  console.log(i, typeof i); // "0" string, "1" string, "2" string
}
// 1) Индексы возвращаются СТРОКАМИ ("0", "1", "2"), а не числами
// 2) Порядок не гарантирован (хотя на практике у современных движков OK)
// 3) Если кто-то добавит свойство массиву (arr.foo = 1) - оно тоже попадется

const arrWithExtra: string[] & { extra?: string } = ["a", "b", "c"];
arrWithExtra.extra = "сюрприз";
for (const i in arrWithExtra) {
  console.log(i); // "0", "1", "2", "extra"  - extra попало в цикл!
}

// =============================================
// 5. Чем заменить for...in для массивов
// =============================================
// Правильные варианты:

const items = ["a", "b", "c"];

// for...of - обходит ЗНАЧЕНИЯ:
for (const item of items) {
  console.log(item); // "a", "b", "c"
}

// forEach - метод массива:
items.forEach((item, index) => {
  console.log(index, item); // index - number, не string!
});

// Классический for - когда нужен явный индекс как число:
for (let i = 0; i < items.length; i++) {
  console.log(i, items[i]);
}

// =============================================
// 6. for...in vs for...of - не путай
// =============================================
// for...in   - КЛЮЧИ (имена свойств) объекта
// for...of   - ЗНАЧЕНИЯ из итерируемой коллекции (массив, строка, Set, Map)

const obj = { a: 1, b: 2 };
for (const k in obj) console.log("in:", k); // "a", "b"

const list = [10, 20];
for (const v of list) console.log("of:", v); // 10, 20

// Запоминалка:
//   "in" - какие ключи В объекте есть
//   "of" - какие значения получаются ИЗ коллекции

// =============================================
// 7. Альтернатива - Object.keys / values / entries
// =============================================
// Чаще, чем for...in, в современном коде используют эти методы.
// Они возвращают массивы, с которыми удобнее работать.

const user = { name: "Аня", age: 25, city: "Минск" };

// Только ключи:
console.log(Object.keys(user)); // ["name", "age", "city"]

// Только значения:
console.log(Object.values(user)); // ["Аня", 25, "Минск"]

// Пары [ключ, значение]:
console.log(Object.entries(user)); // [["name","Аня"], ["age",25], ...]

// Удобно деструктурировать в for...of:
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

// Эти методы возвращают ТОЛЬКО собственные перечисляемые свойства -
// унаследованные не попадают. Это безопаснее, чем for...in.

// =============================================
// 8. TS-специфика: типизация ключа в for...in
// =============================================
// В TS for...in типизирует ключ как обычный string,
// а НЕ как объединение литералов ключей объекта.
// Это известное "ограничение" TS - язык не знает, был ли объект
// "расширен" другими ключами через индексные сигнатуры или прототип.

const point = { x: 1, y: 2, z: 3 };

for (const key in point) {
  // тип key: string, а НЕ "x" | "y" | "z"
  // console.log(point[key]);  // Ошибка: any string не индексирует point
  console.log(point[key as keyof typeof point]); // нужен явный as keyof
}

// Object.keys тоже возвращает string[], не литералы. То же ограничение.

// Чище и типобезопаснее - Object.entries или явный type assertion:
const typedKeys = Object.keys(point) as (keyof typeof point)[];
for (const key of typedKeys) {
  console.log(point[key]); // OK, тип number
}

// =============================================
// 9. TS-специфика: keyof typeof
// =============================================
// "keyof typeof obj" - это объединение литералов ключей объекта.
// Очень полезно при работе с for...in.

const colorMap = { red: "#f00", green: "#0f0", blue: "#00f" };
type ColorName = keyof typeof colorMap; // "red" | "green" | "blue"

const pickColor = (name: ColorName): string => colorMap[name];
console.log(pickColor("red")); // "#f00"
// pickColor("yellow");        // Ошибка компиляции

// =============================================
// 10. Когда for...in уместен
// =============================================
// for...in реально хорош только в одном случае:
// когда у тебя ОБЪЕКТ-СЛОВАРЬ с неизвестными заранее ключами
// (например, ответ API в виде { [id: string]: User }).

type UserMap = { [id: string]: { name: string } };

const users: UserMap = {
  u1: { name: "Аня" },
  u2: { name: "Боря" },
  u3: { name: "Вова" },
};

for (const id in users) {
  console.log(id, users[id].name);
}
// u1 Аня
// u2 Боря
// u3 Вова

// Здесь key - правильный тип string, и индексация работает без as.

// =============================================
// Итог
// =============================================
// - for...in перебирает КЛЮЧИ объекта (всегда как строки)
// - Включает унаследованные перечисляемые свойства
// - НЕ используй для массивов (есть for...of, forEach, классический for)
// - В TS ключ типизируется как string, не как литеральные ключи -
//   нужен "as keyof typeof obj" для типобезопасной индексации
// - Чаще удобнее Object.keys/values/entries + for...of
// - Реально уместен для словарей с заранее неизвестными ключами

// =============================================
// Задачка в стиле Codewars (8 kyu): Calculate Cart Total
// =============================================
// Создай функцию calculateTotal, которая принимает объект "корзина"
// и возвращает общую сумму всех значений.
//
// Корзина выглядит так:
//   { apple: 50, bread: 100, milk: 80 }
//
// Сумма = 50 + 100 + 80 = 230
//
// Используй ЦИКЛ for...in для обхода ключей.
//
// Примеры:
//   calculateTotal({ apple: 50, bread: 100, milk: 80 }) -> 230
//   calculateTotal({ pen: 10, book: 200 })              -> 210
//   calculateTotal({})                                  -> 0
//
// Подсказки:
//   1. Тип корзины - Record<string, number> (объект, где ключи строки,
//      а значения числа). С таким типом TS позволит писать cart[key]
//      без "as keyof".
//   2. Накапливай сумму в переменной let total = 0.
//   3. На каждой итерации прибавляй cart[key] к total.
//
// Решение пиши здесь:

const calculateTotal = (cart: Record<string, number>): number => {
  let total = 0;
  for (const key in cart) {
    total += cart[key];
  }
  return total;
};

console.log(calculateTotal({ apple: 50, bread: 100, milk: 80 })); // ожидается: 230
console.log(calculateTotal({ pen: 10, book: 200 })); // ожидается: 210
console.log(calculateTotal({})); // ожидается: 0

// =============================================
// Пример из реальной практики: фильтры для API
// =============================================
// Ситуация: на странице магазина пользователь заполнил форму поиска -
// какие-то поля заполнил, какие-то оставил пустыми.
// Состояние формы лежит в объекте filters.
//
// Задача: построить URL вида /products?category=books&minPrice=10
// и отправить запрос на API.
// При этом ПУСТЫЕ поля (null, undefined, "") нужно ПРОПУСКАТЬ -
// иначе бек получит "минимальная цена = пусто" и упадет.
//
// for...in идеально подходит, потому что:
//   - ключи фильтров заранее неизвестны (могут добавляться новые)
//   - нужно зайти в каждый ключ и проверить значение

type FilterValue = string | number | boolean | null | undefined;
type Filters = Record<string, FilterValue>;

const buildQueryString = (filters: Filters): string => {
  const parts: string[] = [];

  for (const key in filters) {
    const value = filters[key];

    // пропускаем "пустые" значения - они не должны попадать в URL
    if (value === null || value === undefined || value === "") {
      continue;
    }

    // encodeURIComponent защищает от спецсимволов (пробелов, &, ?, кириллицы)
    parts.push(`${key}=${encodeURIComponent(String(value))}`);
  }

  return parts.length > 0 ? "?" + parts.join("&") : "";
};

// Пример состояния формы поиска - пользователь выбрал категорию
// и минимальную цену, остальное оставил пустым.
const formState: Filters = {
  category: "books",
  search: "",          // пустая строка - пропустится
  minPrice: 10,
  maxPrice: null,      // null - пропустится
  inStock: true,
  sortBy: undefined,   // undefined - пропустится
};

console.log(buildQueryString(formState));
// "?category=books&minPrice=10&inStock=true"

// Пустой объект - пустая строка:
console.log(buildQueryString({})); // ""

// Все поля пустые - тоже пустая строка:
console.log(buildQueryString({ a: "", b: null, c: undefined })); // ""

// Реальный код выглядел бы так:
// const url = "/api/products" + buildQueryString(formState);
// const response = await fetch(url);

// =============================================
// Что тут TS-специфичного
// =============================================
// 1. FilterValue - объединение возможных типов значений фильтра.
//    Это типичный паттерн: "может быть строка, число, булка или пусто".
//
// 2. Filters = Record<string, FilterValue> - словарь с произвольными
//    именами фильтров. Не привязываемся к конкретным полям, потому что
//    набор фильтров на разных страницах разный.
//
// 3. Внутри цикла после if-а TS СУЖАЕТ тип value:
//    - до if value: string | number | boolean | null | undefined
//    - после continue value: string | number | boolean
//    Это называется "type narrowing" - см. Основы/closures-and-scope.ts
//
// 4. String(value) безопасно преобразует число/булку/строку в строку,
//    потому что для нашего сужения это всегда сработает корректно.
