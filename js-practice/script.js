console.log("Привет, JS!");

// ============================================
// УРОК 1: Variables and Operators
// ============================================

// ----- ПЕРЕМЕННЫЕ -----

// let — можно менять
let firstName = "Иван";
console.log(firstName);

firstName = "Петр";
console.log(firstName);

// const — нельзя менять
const PI = 3.14159;
console.log(PI);
// PI = 5;  // ← если раскомментировать, будет ошибка!

// ----- ЧИСЛА И АРИФМЕТИКА -----

const a = 10;
const b = 3;

console.log("a + b =", a + b); // 13
console.log("a - b =", a - b); // 7
console.log("a * b =", a * b); // 30
console.log("a / b =", a / b); // 3.333...
console.log("a % b =", a % b); // 1 (остаток)
console.log("a ** b =", a ** b); // 1000 (степень)

// ----- СТРОКИ И TEMPLATE LITERALS -----

const name = "Иван";
const age = 25;

// Старый способ
console.log("Привет, " + name + "! Тебе " + age + " лет.");

// Новый способ — template literals (обратные кавычки `)
console.log(`Привет, ${name}! Тебе ${age} лет.`);

// ============================================
// ЗДЕСЬ БУДУТ ТВОИ ЗАДАНИЯ
// ============================================

// TODO: Задание 1 — сложи два числа через console.log
console.log(23 + 97);

// TODO: Задание 2 — сложи 6 разных чисел
console.log(1 + 2 + 3 + 4 + 5 + 6);
// TODO: Задание 3 — вычисли (4 + 6 + 9) / 77
console.log((4 + 6 + 9) / 77);
// TODO: Задание 4 — let a = 10, потом переприсвой, потом let b = 7 * a
// Переименовал в num и result, чтобы не конфликтовало с const a и b выше
let num = 10;
num = 12;
let result = 7 * num;
console.log(result); // 84

// TODO: Задание 5 — const max = 57, const actual = max - 13, const percentage = actual / max
const max = 57;
const actual = max - 13;
const percentage = actual / max;
console.log(percentage);

// Демо null и toString - переименовал переменные, чтобы не конфликтовали с num выше
let nothing = null;
console.log(nothing); // null

const myNumber = 52;
console.log(myNumber); // 52
console.log(myNumber.toString()); // "52" - число превращается в строку

// ============================================
// УРОК 2: Условия, тернарный, switch, логика
// ============================================
// После каждого TODO напиши код и запусти скрипт.
// Ожидаемый результат указан в комментариях.

// ----- ЗАДАНИЕ 6: if / else -----
// Объяви const userAge = 17 (или другое число).
// Если userAge >= 18 - выведи "Можно голосовать"
// Иначе - "Слишком молод(а)"
//
// Поменяй userAge на 20 и убедись, что вывод меняется.

const userAge = 17;
if (userAge >= 18) {
  console.log("Можно голосовать");
} else {
  console.log("Слишком молод(а)");
}

// ----- ЗАДАНИЕ 7: if / else if / else -----
// Объяви const score = 75
// Выведи оценку по правилам:
//   score >= 90 -> "A"
//   score >= 70 -> "B"
//   score >= 50 -> "C"
//   иначе       -> "F"
// При 75 должен вывестись "B"

const score = 75;
if (score >= 90) {
  console.log("A");
} else if (score >= 70) {
  console.log("B");
} else if (score >= 50) {
  console.log("C");
} else {
  console.log("F");
}

// ----- ЗАДАНИЕ 8: Тернарный оператор -----
// Переменная isLoggedIn = true.
// Через тернарный сделай const greeting = ...
// Если залогинен - "Привет!", иначе - "Войдите"
// Выведи greeting в консоль.

const isLoggedIn = true;
const greeting = isLoggedIn ? "Привет!" : "Войдите";
console.log(greeting);

// ----- ЗАДАНИЕ 9: switch -----
// Объяви const day = "wednesday"
// Через switch выведи название дня по-русски:
//   monday    -> "Понедельник"
//   tuesday   -> "Вторник"
//   wednesday -> "Среда"
//   thursday  -> "Четверг"
//   friday    -> "Пятница"
//   default   -> "Выходной"
// Не забудь break после каждого case!

const day = "wednesday";
switch (day) {
  case "monday":
    console.log("Понедельник");
    break;
  case "tuesday":
    console.log("Вторник");
    break;
  case "wednesday":
    console.log("Среда");
    break;
  case "thursday":
    console.log("Четверг");
    break;
  case "friday":
    console.log("Пятница");
    break;
  default:
    console.log("Выходной");
}
// твой код здесь

// ----- ЗАДАНИЕ 10: Логические операторы (&&, ||) -----
// Объяви: const age = 25, const hasLicense = true
// Если возраст >= 18 И есть права - "Можно водить"
// Иначе - "Нельзя"

const driverAge = 25;
const hasLicense = true;
if (age >= 18 && hasLicense) {
  console.log("Можно водить");
} else {
  console.log("Нельзя");
}
// твой код здесь

// ----- ЗАДАНИЕ 11: Truthy / Falsy + || -----
// Объяви const inputName = ""
// Через || подставь "Гость", если imputName falsy.
// Например: const displayName = inputName || "Гость";
// Выведи displayName

const inputName = "";
const displayName = inputName || "Гость";
console.log(displayName);

// твой код здесь

// ----- ЗАДАНИЕ 12: «Угадай вывод» -----
// Просто посмотри на код и предскажи результат - потом запусти.
// (Эти строки уже готовы - не меняй)

console.log("--- угадай вывод ---");
console.log(Boolean(0)); // ?
console.log(Boolean("")); // ?
console.log(Boolean("0")); // ? ловушка!
console.log(Boolean([])); // ? ловушка!
console.log("5" == 5); // ?
console.log("5" === 5); // ?
console.log(null == undefined); // ?
console.log(null === undefined); // ?
console.log(Math.round(24.23));
