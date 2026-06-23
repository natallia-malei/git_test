// Объект Date - работа с датами и временем
// Конспект по статье https://doka.guide/js/date/

// =============================================
// 1. Создание даты
// Класс для работы со временем
// =============================================
// Есть четыре способа.

const now = new Date(); // сейчас (текущий момент)
const fromStr = new Date("2026-06-23"); // из ISO-строки
const fromParts = new Date(2026, 5, 23, 14, 30); // год, месяц, день, час, минута
const fromTs = new Date(1_750_000_000_000); // из миллисекунд (timestamp)

console.log(now);
console.log(fromStr);
console.log(fromParts);
console.log(fromTs);

// ВНИМАНИЕ: в new Date(год, месяц, ...) МЕСЯЦЫ С НУЛЯ!
// Январь = 0, Февраль = 1, ..., Декабрь = 11.
// День месяца - с 1 (как обычно).
const newYear = new Date(2026, 0, 1); // 1 января 2026
const december = new Date(2026, 11, 1); // 1 декабря 2026
console.log(newYear, december);

// =============================================
// 2. Получение частей даты
// =============================================
const d = new Date("2026-06-23T14:30:45.123");

console.log(d.getFullYear()); // 2026
console.log(d.getMonth()); // 5 (июнь = 5, помни про 0)
console.log(d.getDate()); // 23 (день месяца, 1-31)
console.log(d.getDay()); // 2 (день недели, 0=ВС, 1=ПН, ..., 6=СБ)
console.log(d.getHours()); // 14
console.log(d.getMinutes()); // 30
console.log(d.getSeconds()); // 45
console.log(d.getMilliseconds()); // 123
console.log(d.getTime()); // timestamp в миллисекундах от 1970-01-01

// Все методы есть и в UTC-версии: getUTCFullYear, getUTCMonth, и т.д.
// Обычные get* возвращают значения в ЛОКАЛЬНОЙ зоне браузера.

// =============================================
// 3. Текущее время (timestamp)
// =============================================
console.log(Date.now()); // миллисекунды от эпохи, быстрее чем new Date().getTime()

// Часто нужно для измерения времени:
const start = Date.now();
for (let i = 0; i < 1_000_000; i++) {} // что-то долгое
const elapsed = Date.now() - start;
console.log(`Заняло ${elapsed} мс`);

// =============================================
// 4. Изменение даты
// =============================================
// set-методы МУТИРУЮТ объект (меняют дату на месте, не возвращают новую).

const future = new Date(2026, 0, 1);
future.setFullYear(2027); // теперь 1 января 2027
future.setMonth(5, 15); // теперь 15 июня 2027
future.setHours(10, 30); // 10:30 утра
console.log(future);

// "Завтра" - прибавить день:
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log(tomorrow);

// =============================================
// 5. Автокоррекция при выходе за диапазон
// =============================================
// Если поставить день 32 - JS автоматически перейдет в следующий месяц.
// Это удобно для арифметики "плюс N дней".

const auto = new Date(2026, 0, 32); // 32 января не существует
console.log(auto); // 1 февраля 2026 - автоматически

const back = new Date(2026, 0, 1);
back.setDate(0); // 0-е число = последний день предыдущего месяца
console.log(back); // 31 декабря 2025

// =============================================
// 6. Форматирование
// =============================================
const sample = new Date("2026-06-23T14:30:00");

// ISO 8601 - международный стандарт, всегда в UTC:
console.log(sample.toISOString()); // "2026-06-23T11:30:00.000Z"

// Локальные форматы (зависят от языка пользователя):
console.log(sample.toLocaleDateString("ru-RU")); // "23.06.2026"
console.log(sample.toLocaleDateString("en-US")); // "6/23/2026"
console.log(sample.toLocaleTimeString("ru-RU")); // "14:30:00"
console.log(sample.toLocaleString("ru-RU")); // "23.06.2026, 14:30:00"

// С точной настройкой полей:
console.log(
  sample.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }),
); // "вторник, 23 июня 2026 г."

// =============================================
// 7. Сравнение и арифметика
// =============================================
// Date поддерживает -, <, > - они работают через timestamp.
// А вот == и === НЕ работают как ожидаешь - сравнивают ссылки.

const a = new Date("2026-01-01");
const b = new Date("2026-12-31");

console.log(b > a); // true
console.log(b.getTime() - a.getTime()); // разница в миллисекундах
console.log((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)); // 364 дня

// СРАВНЕНИЕ через ===:
const a1 = new Date("2026-01-01");
const a2 = new Date("2026-01-01");
console.log(a1 === a2); // false!  разные объекты
console.log(a1.getTime() === a2.getTime()); // true   сравнение по timestamp
// Чтобы корректно сравнить даты - сравнивай getTime() или +date.

// =============================================
// 8. TS-специфика
// =============================================
// Тип объекта даты - просто "Date".
const event: Date = new Date();
console.log(event);

// Часто хранят timestamp как number и конвертируют по месту:
type Event = {
  id: number;
  createdAt: number; // timestamp
};

const e: Event = { id: 1, createdAt: Date.now() };
const eventDate = new Date(e.createdAt);
console.log(eventDate.toLocaleString("ru-RU"));

// API обычно возвращают даты как строки ISO. Тогда тип string, и
// конвертация: new Date(stringFromApi).

type ApiResponse = {
  user: string;
  registeredAt: string; // "2026-06-23T14:30:00Z"
};

const resp: ApiResponse = { user: "Аня", registeredAt: "2026-06-23T14:30:00Z" };
console.log(new Date(resp.registeredAt).toLocaleDateString("ru-RU"));

// =============================================
// 9. Главные ловушки
// =============================================
// 1) МЕСЯЦЫ С НУЛЯ. Самая частая ошибка.
//    new Date(2026, 6, 1) - это 1 ИЮЛЯ, а не июнь.

// 2) Часовые зоны.
//    new Date("2026-06-23") - парсится как UTC (полночь UTC).
//    new Date("2026-06-23T14:30") - локальная зона.
//    new Date(2026, 5, 23) - локальная зона.
//    Если есть смешение - результаты "плавают" в зависимости от зоны клиента.

// 3) Мутирующие set-методы.
//    setDate, setMonth и т.п. меняют исходный объект. Если нужна копия -
//    сначала клонируй: new Date(original).

const original = new Date(2026, 0, 1);
const clone = new Date(original); // независимая копия
clone.setMonth(5);
console.log(original.getMonth()); // 0 - не задет
console.log(clone.getMonth()); // 5

// 4) === не сравнивает даты по значению. Используй +date или getTime().

// =============================================
// 10. На практике - бери библиотеку
// =============================================
// Для серьезной работы с датами (форматирование, разница в неделях/месяцах,
// часовые зоны, парсинг) - используй date-fns или day.js.
// Это маленькие, иммутабельные, типизированные библиотеки.
// moment.js устарел, не используй в новых проектах.

// Из стандартных полезных трюков:
// - округление вверх дней между датами
const daysBetween = (a: Date, b: Date): number =>
  Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

console.log(daysBetween(new Date("2026-01-01"), new Date("2026-12-31"))); // 364

// =============================================
// Итог
// =============================================
// - new Date() / Date.now() / new Date(timestamp) - три главных способа
// - Месяцы с 0! Самая частая ошибка
// - get* / set* в локальной зоне, getUTC* / setUTC* в UTC
// - Для сравнения - getTime(), а не ===
// - Для форматирования - toLocaleDateString с настройками
// - Для серьезной работы - date-fns или day.js
