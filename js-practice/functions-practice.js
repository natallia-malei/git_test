// ============================================
// ПРАКТИКА: Функции
// ============================================
// Запускай: node "путь/к/functions-practice.js"
// Или открой index.html и подключи этот файл вместо script.js

// ----- ЗАДАЧА 1: add7 -----
// Создай функцию add7, которая принимает число и возвращает это число + 7.
// Используй function declaration или arrow function - на выбор.
//
// Пример:
//   add7(10) → 17
//   add7(0)  → 7
//   add7(-3) → 4

// твой код здесь
const add7 = (num) => {
  return num + 7;
};
console.log("add7(10) =", add7(10)); // должно быть 17
console.log("add7(0)  =", add7(0)); // должно быть 7
console.log("add7(-3) =", add7(-3)); // должно быть 4

// ----- ЗАДАЧА 2: multiply -----
// Создай функцию multiply, которая принимает 2 числа и возвращает их произведение.
//
// Пример:
//   multiply(3, 4) → 12
//   multiply(5, 5) → 25
//   multiply(10, 0) → 0

// твой код здесь
const multiply = (num1, num2) => {
  return num1 * num2;
};
console.log("multiply(3, 4)  =", multiply(3, 4)); // 12
console.log("multiply(5, 5)  =", multiply(5, 5)); // 25
console.log("multiply(10, 0) =", multiply(10, 0)); // 0

// ----- ЗАДАЧА 3: capitalize -----
// Создай функцию capitalize, которая возвращает строку, у которой ТОЛЬКО ПЕРВАЯ
// буква заглавная, а остальные - строчные.
//
// Подсказки:
//   - str[0]            - первый символ
//   - str.slice(1)      - всё кроме первого
//   - .toUpperCase() / .toLowerCase()
//
// Пример:
//   capitalize("hello")     → "Hello"
//   capitalize("WORLD")     → "World"
//   capitalize("jAvAsCriPt") → "Javascript"

// твой код здесь
const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
console.log("capitalize('hello')     =", capitalize("hello"));
console.log("capitalize('WORLD')     =", capitalize("WORLD"));
console.log("capitalize('jAvAsCriPt') =", capitalize("jAvAsCriPt"));

// ----- ЗАДАЧА 4: lastLetter -----
// Создай функцию lastLetter, которая возвращает последний символ строки.
//
// Подсказка:
//   - str.length - длина строки
//   - str[str.length - 1] - последний символ
//   - или str.slice(-1)
//
// Пример:
//   lastLetter("hello") → "o"
//   lastLetter("JS")    → "S"
//   lastLetter("?")     → "?"

// твой код здесь
const lastLetter = (str) => {
  return str[str.length - 1];
};
console.log("lastLetter('hello') =", lastLetter("hello")); // "o"
console.log("lastLetter('JS')    =", lastLetter("JS")); // "S"
console.log("lastLetter('?')     =", lastLetter("?")); // "?"
