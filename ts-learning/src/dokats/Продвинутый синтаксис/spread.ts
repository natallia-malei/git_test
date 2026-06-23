// Spread-оператор (...)
// Конспект по статье https://doka.guide/js/spread/

// =============================================
// 1. Что это
// =============================================
// Spread (расширение, "...") - "распаковывает" итерируемую коллекцию
// (массив, строку, Set, Map) или объект в отдельные элементы.
// Используется в трех местах:
//   1. В вызовах функций - как аргументы
//   2. В литералах массивов - как элементы
//   3. В литералах объектов - как поля

// =============================================
// 2. Spread в вызовах функций
// =============================================
// Раньше для передачи массива как аргументов использовали apply.
// Сейчас - просто spread.

const multiply = (a: number, b: number, c: number): number => a * b * c;

const nums: [number, number, number] = [2, 3, 4];
console.log(multiply(...nums)); // 24

// TS проверяет соответствие количества и типов!
// Если бы nums был просто number[], TS бы заругался:
// const nums2: number[] = [2, 3, 4];
// multiply(...nums2);  // Ошибка: spread argument must have tuple type

// Поэтому если нужно spread'ить массив в функцию с фиксированным числом
// аргументов - используй кортеж (tuple).

// Классический пример с Math.max:
const arr = [5, 2, 9, 1, 7];
console.log(Math.max(...arr)); // 9
// Без spread: Math.max([5, 2, 9, 1, 7])  - вернул бы NaN,
// потому что Math.max ждет отдельные числа, а не массив.

// =============================================
// 3. Spread в массивах
// =============================================
// Самое частое применение.

// Объединение массивов:
const movies = ["Rocky", "Terminator"];
const series = ["Breaking Bad", "Sherlock"];
const all = [...movies, ...series];
console.log(all); // ["Rocky", "Terminator", "Breaking Bad", "Sherlock"]

// Вставка элемента:
const middle = [2, 3];
const withEnds = [1, ...middle, 4];
console.log(withEnds); // [1, 2, 3, 4]

// Копирование массива (поверхностное):
const original = [1, 2, 3];
const copy = [...original];
copy.push(99);
console.log(original); // [1, 2, 3]  - не задет
console.log(copy);     // [1, 2, 3, 99]

// =============================================
// 4. Spread в объектах
// =============================================
// Копирование полей + возможность переопределить.

const person = { name: "Иван", age: 30 };
const employee = { ...person, role: "developer" };
console.log(employee); // { name: "Иван", age: 30, role: "developer" }

// Переопределение поля (поле справа от spread'а перебивает):
const updated = { ...person, age: 31 };
console.log(updated); // { name: "Иван", age: 31 }

// Порядок важен! Spread СПРАВА перетирает spread СЛЕВА.
const a = { x: 1, y: 1 };
const b = { y: 2, z: 2 };
const merged = { ...a, ...b };
console.log(merged); // { x: 1, y: 2, z: 2 }  - y из b победил

// =============================================
// 5. Подвох: spread копирует ТОЛЬКО верхний уровень
// =============================================
// Это касается и массивов, и объектов.
// Вложенные объекты/массивы остаются общими ссылками.
// Связано с темой ref vs value (см. Основы/ref-type-vs-value-type.ts).

const user = {
  name: "Аня",
  address: { city: "Минск" }
};

const userCopy = { ...user };
userCopy.address.city = "Москва";
console.log(user.address.city); // "Москва"  - задет! address общий

// Для массивов аналогично:
const matrix = [[1, 2], [3, 4]];
const matrixCopy = [...matrix];
matrixCopy[0].push(999);
console.log(matrix); // [[1, 2, 999], [3, 4]]  - внутренний массив общий

// Решение - structuredClone или ручное копирование вложенных уровней.

// =============================================
// 6. Spread у строк
// =============================================
// Строка - тоже итерируемая, spread разбивает ее на символы.

const word = "hello";
const chars = [...word];
console.log(chars); // ["h", "e", "l", "l", "o"]

// Это работает корректно даже с emoji и составными символами
// (в отличие от word.split("") в некоторых случаях).
const withEmoji = "a★b";
console.log([...withEmoji]); // ["a", "★", "b"]

// =============================================
// 7. Spread с Set и Map
// =============================================
// Set - коллекция уникальных значений. Spread превращает ее в массив.

const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set);          // Set { 1, 2, 3 }
console.log([...set]);     // [1, 2, 3]

// Удобный трюк - удалить дубли из массива:
const dupes = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(dupes)];
console.log(unique); // [1, 2, 3, 4]

// =============================================
// 8. Spread vs Rest - одинаковый "..." разные роли
// =============================================
// Spread: РАСПАКОВЫВАЕТ коллекцию в отдельные элементы.
// Rest:   СОБИРАЕТ отдельные элементы в коллекцию.
// Различаются по КОНТЕКСТУ, где стоит "...".

// REST - в объявлении функции, собирает аргументы в массив:
const sum = (...numbers: number[]): number => {
  return numbers.reduce((acc, n) => acc + n, 0);
};
console.log(sum(1, 2, 3, 4)); // 10  - все аргументы попали в numbers

// SPREAD - в вызове функции, разворачивает массив в аргументы:
const arr2 = [1, 2, 3, 4];
console.log(sum(...arr2)); // 10  - массив развернут обратно

// REST в деструктуризации:
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest);  // [20, 30, 40]

// SPREAD в массиве:
const more = [...rest, 50];
console.log(more);  // [20, 30, 40, 50]

// Правило: если "..." слева от "=" - это rest. Если справа или в вызове - spread.

// =============================================
// 9. TS-специфика: типизация rest-параметров
// =============================================
// Тип rest-параметра - всегда массив (или tuple).

const concat = (sep: string, ...words: string[]): string => words.join(sep);
console.log(concat(", ", "a", "b", "c")); // "a, b, c"

// Можно использовать tuple для разных типов:
const log = (prefix: string, ...args: [string, number]): void => {
  console.log(prefix, args[0], args[1]);
};
log("info:", "count", 42); // OK
// log("info:", "count");          // Ошибка: ожидается 2 аргумента в tuple

// =============================================
// 10. TS-специфика: tuple со spread'ом
// =============================================
// Можно описать tuple, в котором часть элементов фиксирована,
// а остальные - переменное количество.

type EventPayload = [string, ...number[]];

const ev1: EventPayload = ["click"];           // OK
const ev2: EventPayload = ["click", 10, 20];   // OK
const ev3: EventPayload = ["scroll", 100, 200, 300]; // OK
// const bad: EventPayload = [10, "click"];    // Ошибка: первый должен быть string

console.log(ev1, ev2, ev3);

// =============================================
// 11. TS-специфика: вывод типа при spread'е массивов
// =============================================
// TS объединяет типы элементов.

const a1: number[] = [1, 2, 3];
const a2: string[] = ["a", "b"];
const mix = [...a1, ...a2];
// тип mix выводится как (string | number)[]
console.log(mix);

// При spread'е tuple'ов сохраняется структура:
const t1: [number, number] = [1, 2];
const t2: [string, string] = ["a", "b"];
const tMix = [...t1, ...t2] as const;
// тип tMix: readonly [1, 2, "a", "b"] благодаря as const

console.log(tMix);

// =============================================
// 12. Частые паттерны
// =============================================

// Добавить элемент в массив, не мутируя оригинал:
const nums2 = [1, 2, 3];
const withFour = [...nums2, 4];        // [1, 2, 3, 4]
console.log(withFour);

// Удалить элемент из массива по индексу, не мутируя:
const removed = [...nums2.slice(0, 1), ...nums2.slice(2)];
console.log(removed); // [1, 3]  - удалили элемент с индексом 1

// Обновить поле объекта, не мутируя:
const state = { user: "Аня", count: 0 };
const newState = { ...state, count: state.count + 1 };
console.log(newState); // { user: "Аня", count: 1 }

// Этот паттерн - основа Redux/Zustand/любого иммутабельного state-менеджмента.

// =============================================
// Итог
// =============================================
// - "..." перед коллекцией = РАСПАКОВАТЬ (spread)
// - "..." перед параметром = СОБРАТЬ (rest)
// - Работает с массивами, объектами, строками, Set, Map
// - Копирование - ТОЛЬКО верхний уровень (shallow copy)
// - Главное практическое применение: иммутабельные обновления
//   массивов и объектов (без мутаций оригинала)
