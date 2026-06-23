// const в JavaScript/TypeScript - глубже
// Конспект по статье https://doka.guide/js/const/

// =============================================
// 1. const обязательно требует начального значения
// =============================================
// let без значения объявить можно, const - нет.

// const empty; // Error: 'const' declarations must be initialized.
const DAYS_IN_YEAR = 365;

// =============================================
// 2. const блокирует ПРИВЯЗКУ имени, а не содержимое
// =============================================
// Для примитивов (число, строка, булево) это полная заморозка:
const PI = 3.14;
// PI = 3.1415; // Error

// Для объектов и массивов - менять содержимое можно,
// нельзя только заменить саму ссылку.
const series = ["Доктор Хаус", "Клиника", "Чёрное зеркало"];
series.push("Молодой папа"); // OK - меняем массив
console.log(series);
// series = []; // Error - меняем ссылку

type Person = { name: string; lastName: string; age?: number };
const person: Person = { name: "Маск", lastName: "Илон" };
person.age = 0; // OK, никаких as не нужно

// const person = { name: "Маск", lastName: "Илон" };
// (person as { name: string; lastName: string; age?: number }).age = 0; // OK
// // person = { name: "Педро", lastName: "Паскаль" }; // Error

// =============================================
// 3. TS-фишка: as const - полная заморозка
// =============================================
// Если хочешь, чтобы и СОДЕРЖИМОЕ нельзя было менять - используй as const.

const config = { host: "localhost", port: 3000 } as const;
// config.port = 4000; // Error: Cannot assign to 'port' because it is a read-only property.

const colors = ["red", "green", "blue"] as const;
// colors.push("yellow"); // Error: Property 'push' does not exist on type 'readonly [...]'

// Бонус: as const сужает тип до конкретных литералов.
// Без as const:
const status1 = "active"; // тип: string
// С as const:
const status2 = "active" as const; // тип: "active" (литеральный)

console.log(status1, status2);

// =============================================
// 4. TS-фишка: readonly - запрет менять отдельное поле
// =============================================
// Если нужна не вся заморозка, а только защита конкретных свойств:

type User = {
  readonly id: number; // менять нельзя
  name: string; // менять можно
};

const u: User = { id: 1, name: "Аня" };
u.name = "Оля"; // OK
// u.id = 2;      // Error: Cannot assign to 'id' because it is a read-only property.

// Для массивов есть ReadonlyArray<T> или сокращение readonly T[]:
const ids: readonly number[] = [1, 2, 3];
// ids.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'.

// =============================================
// 5. Когда что брать
// =============================================
// const            - значение задается один раз, ссылка не меняется (по умолчанию).
// readonly         - защита конкретного поля у объекта.
// as const         - полная заморозка содержимого + узкий литеральный тип.
// ReadonlyArray<T> - массив только для чтения.

// =============================================
// 6. Именование
// =============================================
// camelCase - для обычных значений, вычисленных один раз:
const currentUser = { name: "Аня" };
const itemsPerPage = 25;

// ALL_CAPS (SCREAMING_SNAKE_CASE) - для "фундаментальных" констант-настроек:
const DAYS_IN_WEEK = 7;
const MAX_RETRIES = 3;
const API_BASE_URL = "https://doka.guide";

console.log(currentUser, itemsPerPage, DAYS_IN_WEEK, MAX_RETRIES, API_BASE_URL);
