// Переменные const, let и var
// Конспект по статье https://doka.guide/js/var-let/

// =============================================
// 1. Объявление переменных
// =============================================
// В TS у переменной есть имя, значение И тип.
// Тип можно указать явно через двоеточие, либо TS выведет его сам.

let userName: string = "Уолтер";   // тип указан явно
let userSurname = "Вайт";          // TS сам поймет, что это string (вывод типа, type inference)
const fullName = userName + " " + userSurname;
console.log(fullName); // Уолтер Вайт

// =============================================
// 2. let - значение можно менять
// =============================================
let counter = 0;
counter = 1;
counter = 2;
console.log(counter); // 2

// Но тип менять нельзя - TS не даст:
// counter = "три"; // Error: Type 'string' is not assignable to type 'number'

// =============================================
// 3. const - значение менять нельзя
// =============================================
const PI = 3.14;
// PI = 3.1415; // Error: Cannot assign to 'PI' because it is a constant.

// ВАЖНО: const защищает только ссылку, не содержимое объекта/массива.
const user = { name: "Аня", age: 25 };
user.age = 26;         // OK - меняем поле внутри объекта
console.log(user);     // { name: 'Аня', age: 26 }
// user = { name: "Оля", age: 30 }; // Error - переприсвоить нельзя

const numbers = [1, 2, 3];
numbers.push(4);       // OK - массив можно мутировать
console.log(numbers);  // [1, 2, 3, 4]

// Если хочется защитить и содержимое - в TS есть readonly и as const:
const config = { host: "localhost", port: 3000 } as const;
// config.port = 4000; // Error: Cannot assign to 'port' because it is a read-only property.

// =============================================
// 4. Блочная область видимости (let, const)
// =============================================
if (true) {
  let inside = "я живу только внутри if";
  const alsoInside = 42;
  console.log(inside, alsoInside);
}
// console.log(inside); // Error: Cannot find name 'inside'.

// Разные блоки - разные переменные с одинаковым именем:
let name = "Ольга";
if (true) {
  let name = "Елена"; // другая переменная, в другой области
  console.log(name);  // Елена
}
console.log(name);    // Ольга

// =============================================
// 5. var - почему его не используют
// =============================================
// var имеет функциональную область видимости (а не блочную)
// и всплывает (hoisting). Это источник багов.

function exampleVar() {
  if (true) {
    var leaked = "я вылез из if";
  }
  console.log(leaked); // работает - var "протек" наружу из блока if
}
exampleVar();

// В современном TS-коде var не пишут. Используй const по умолчанию,
// а let - когда значение действительно нужно менять.

// =============================================
// 6. Именование переменных
// =============================================
// camelCase для обычных переменных:
const fullUserName = "John Doe";
const arrayOfNumbers = [1, 2, 3];

// SCREAMING_SNAKE_CASE для констант-настроек:
const BASE_URL = "https://doka.guide";
const PORT = 3000;
const UNAUTHORIZED_CODE = 401;

console.log(BASE_URL, PORT, UNAUTHORIZED_CODE, fullUserName, arrayOfNumbers);
