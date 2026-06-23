// Деструктуризация (destructuring assignment)
// Конспект по статье https://doka.guide/js/destructuring-assignment/

// =============================================
// 1. Зачем нужна
// =============================================
// Деструктуризация - короткий способ "вытащить" значения из объекта
// или массива в отдельные переменные. Заменяет такие повторы:

const person = { name: "Аня", age: 25, city: "Минск" };

// Без деструктуризации:
const oldName = person.name;
const oldAge = person.age;
console.log(oldName, oldAge);

// С деструктуризацией:
const { name, age } = person;
console.log(name, age); // "Аня" 25

// =============================================
// 2. Деструктуризация объекта
// =============================================
// Имена переменных = имена полей.

const point = { x: 10, y: 20, color: "red" };
const { x, y } = point;
console.log(x, y); // 10 20

// Можно ПЕРЕИМЕНОВАТЬ переменную при извлечении ("старое: новое"):
const { x: posX, y: posY } = point;
console.log(posX, posY); // 10 20

// Значения по умолчанию (если поле отсутствует или undefined):
const { color = "black", size = 100 } = point;
// color: "red" (взято из point), size: 100 (взято дефолтное)
console.log(color, size);

// Переименование + дефолт одновременно:
const { color: borderColor = "gray" } = point;
console.log(borderColor); // "red"

// =============================================
// 3. Деструктуризация массива
// =============================================
// Извлекаем по ПОРЯДКУ, имена любые.

const rgb = [255, 100, 50];
const [r, g, b] = rgb;
console.log(r, g, b); // 255 100 50

// Пропуск элементов через запятую:
const [first, , third] = rgb;
console.log(first, third); // 255 50

// Значения по умолчанию:
const [a = 0, bbb = 0, c = 0, d = 99] = [1, 2];
console.log(a, bbb, c, d); // 1 2 0 99

// Обмен переменных без временной (классический трюк):
let one = 1;
let two = 2;
[one, two] = [two, one];
console.log(one, two); // 2 1

// =============================================
// 4. Rest-паттерн (...)
// =============================================
// Собирает "остальное" в отдельную переменную.

// В массиве:
const [head, ...tail] = [10, 20, 30, 40];
console.log(head); // 10
console.log(tail); // [20, 30, 40]

// В объекте:
const { name: personName, ...other } = person;
console.log(personName); // "Аня"
console.log(other); // { age: 25, city: "Минск" }

// Это тот же "...", что и spread, но в другом контексте:
// - в ОБЪЯВЛЕНИИ (слева от "=") - rest, собирает
// - в ВЫЗОВЕ или ЛИТЕРАЛЕ - spread, разворачивает
// (мы это разбирали в spread.ts, раздел 8)

// =============================================
// 5. Вложенная деструктуризация
// =============================================
// Можно "нырять" во вложенные объекты/массивы.

const user = {
  id: 1,
  profile: {
    fullName: "Аня Петрова",
    address: { city: "Минск", zip: "220000" },
  },
  tags: ["admin", "vip"],
};

// Двойной уровень:
const {
  profile: {
    fullName,
    address: { city },
  },
  tags: [firstTag],
} = user;

console.log(fullName); // "Аня Петрова"
console.log(city); // "Минск"
console.log(firstTag); // "admin"

// ВАЖНО: profile и address в этом синтаксисе - НЕ создаются как переменные,
// они только "путь" для извлечения. Чтобы получить и сам profile тоже -
// нужно явно его указать.

// =============================================
// 6. В параметрах функции
// =============================================
// Самое частое и удобное применение в реальном коде.

type CreateButtonOptions = {
  label: string;
  color?: string;
  disabled?: boolean;
};

const createButton = ({
  label,
  color = "blue",
  disabled = false,
}: CreateButtonOptions): string => {
  return `<button ${disabled ? "disabled" : ""} style="color:${color}">${label}</button>`;
};

console.log(createButton({ label: "OK" }));
console.log(createButton({ label: "Cancel", color: "red", disabled: true }));

// Без деструктуризации пришлось бы писать так:
const createButtonOld = (opts: CreateButtonOptions): string => {
  const label = opts.label;
  const color = opts.color || "blue";
  const disabled = opts.disabled || false;
  return `<button ...></button>`;
};
console.log(createButtonOld({ label: "Меньше кода с деструктуризацией" }));

// =============================================
// 7. В колбэках массивов (очень частый паттерн)
// =============================================
type Product = { id: number; name: string; price: number };

const products: Product[] = [
  { id: 1, name: "хлеб", price: 100 },
  { id: 2, name: "молоко", price: 80 },
  { id: 3, name: "яйца", price: 200 },
];

// Деструктуризация прямо в параметре колбэка:
const names = products.map(({ name }) => name);
console.log(names); // ["хлеб", "молоко", "яйца"]

const cheap = products.filter(({ price }) => price < 150);
console.log(cheap);

// С переименованием:
const idsLabeled = products.map(({ id: productId }) => productId);
console.log(idsLabeled);

// Деструктуризация Map.entries (помнишь, мы это делали в for-of.ts):
const cart = new Map<string, number>([
  ["apple", 50],
  ["bread", 100],
]);
for (const [itemName, itemPrice] of cart) {
  console.log(itemName, itemPrice);
}

// =============================================
// 8. Возврат нескольких значений из функции
// =============================================
// Через tuple - функция возвращает массив, деструктурируем при вызове.

const getMinMax = (nums: number[]): [number, number] => {
  return [Math.min(...nums), Math.max(...nums)];
};

const [min, max] = getMinMax([5, 1, 8, 3, 9, 2]);
console.log(min, max); // 1 9

// Этот паттерн используется в React-хуках:
// const [count, setCount] = useState(0);

// =============================================
// 9. TS-специфика: типизация
// =============================================
// При деструктуризации тип КАЖДОЙ переменной выводится автоматически.

const apiResponse = { status: 200, message: "OK", data: { id: 5 } };
const { status, message, data } = apiResponse;
// status: number, message: string, data: { id: number }

// Можно явно типизировать параметр через type:
type Coords = { lat: number; lng: number };

const printCoords = ({ lat, lng }: Coords): void => {
  console.log(`${lat}, ${lng}`);
};
printCoords({ lat: 53.9, lng: 27.5 });

// Дефолтные значения работают и с TS:
const greet = ({
  name = "Гость",
  lang = "ru",
}: {
  name?: string;
  lang?: string;
}): string => (lang === "ru" ? `Привет, ${name}` : `Hello, ${name}`);

console.log(greet({})); // "Привет, Гость"
console.log(greet({ name: "Аня" })); // "Привет, Аня"
console.log(greet({ name: "Anna", lang: "en" })); // "Hello, Anna"

// =============================================
// 10. Главные ловушки
// =============================================

// 1) Если объект может быть undefined - деструктуризация упадет:
//    const { x } = undefined;  // TypeError!
//    Решение: const { x } = obj ?? {};

const safeObj: { x?: number } | undefined = undefined;
const { x: safeX = 0 } = safeObj ?? {};
console.log(safeX); // 0

// 2) Деструктуризация делает ПОВЕРХНОСТНУЮ копию ссылок -
//    вложенные объекты остаются общими (см. ref-type-vs-value-type.ts).

// 3) Имена при деструктуризации объекта ДОЛЖНЫ совпадать с ключами.
//    Если ключ не "name", а "userName" - переименовывай:
//    const { userName: name } = data;

// 4) В массиве важен ПОРЯДОК, в объекте - ИМЕНА.
//    const [first, second] = obj;   // не работает, obj не массив
//    const { 0: first } = arr;      // работает, но никто так не пишет

// =============================================
// Итог
// =============================================
// - { name, age } - вытащить поля объекта в переменные
// - [a, b] - вытащить элементы массива в переменные
// - "...rest" - собрать остальное в массив/объект
// - "name: alias" - переименование при извлечении
// - "field = default" - значение по умолчанию, если undefined
// - Идеально работает в параметрах функций и колбэках
// - В TS типы переменных выводятся автоматически
