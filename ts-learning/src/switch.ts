// switch в JavaScript/TypeScript
// Конспект по статье https://doka.guide/js/switch/

// =============================================
// 1. Базовая форма switch
// =============================================
// switch берёт одно значение и сравнивает его с вариантами через ===.
// Если совпало - выполняет код этого case до break.

type Membership = "vip" | "diamond" | "gold" | "silver" | "regular";

const greet = (status: Membership): void => {
  switch (status) {
    case "vip":
      console.log("Приветствуем вас, ваше великолепие!");
      break;
    case "diamond":
      console.log("Здравствуйте, бриллиантовый клиент!");
      break;
    case "gold":
      console.log("Привет, золотой мой!");
      break;
    default:
      console.log("Здравствуйте!");
      break;
  }
};

greet("vip");
greet("regular");

// =============================================
// 2. Несколько case с одним блоком кода
// =============================================
// Если "gold" и "silver" должны вести себя одинаково - case-ы можно
// "склеить", не повторяя код.

const getDiscount = (status: Membership): number => {
  let discount: number;
  switch (status) {
    case "vip":
      discount = 0.25;
      break;
    case "diamond":
      discount = 0.2;
      break;
    case "gold":
    case "silver": // оба case ведут к одному блоку
      discount = 0.1;
      break;
    default:
      discount = 0;
      break;
  }
  return discount;
};

console.log(getDiscount("gold")); // 0.1
console.log(getDiscount("silver")); // 0.1

// =============================================
// 3. Зачем нужен break (и что без него)
// =============================================
// Без break выполнение "проваливается" в следующий case (fall-through).
// Это почти всегда баг.

const wrongExample = (n: number): string => {
  let result = "";
  switch (n) {
    case 1:
      result = "один";
      break;
    // забыли break - выполнение пойдёт дальше!
    case 2:
      result = "два";
      break;
    case 3:
      result = "три";
      break;
  }
  return result;
};

console.log(wrongExample(1)); // "два" - сюрприз, ожидали "один"

// =============================================
// 4. Шаблон switch + return вместо break
// =============================================
// В функции вместо break можно сразу return - короче и без риска fall-through.

const getDiscountClean = (status: Membership): number => {
  switch (status) {
    case "vip":
      return 0.25;
    case "diamond":
      return 0.2;
    case "gold":
    case "silver":
      return 0.1;
    default:
      return 0;
  }
};

console.log(getDiscountClean("vip")); // 0.25

// =============================================
// 5. TS-фишка: exhaustive check (исчерпывающая проверка)
// =============================================
// Если статусов 5, а в switch обработали только 4 - TS может это поймать.
// Делается через "трюк с never": если в default попадает что-то реальное,
// значит мы упустили случай, и компиляция упадёт.

type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

const orderLabel = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "Ожидает оплаты";
    case "paid":
      return "Оплачен";
    case "shipped":
      return "Отправлен";
    case "cancelled":
      return "Отменён";
    default: {
      // never означает "этого не может произойти".
      // Если кто-то добавит новый статус в OrderStatus, но забудет дописать case -
      // TS подсветит ошибку прямо здесь.
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
};

console.log(orderLabel("paid"));

// =============================================
// 6. Когда switch НЕ нужен - словарь (объект-карта)
// =============================================
// Если задача "по ключу вернуть значение" без сложной логики -
// объект-словарь короче и читабельнее. "Просто соотнести значение со значением" - используй объект-словарь.

const roleToGreeting: Record<string, string> = {
  admin: "Приветствую, босс",
  moder: "Приветствую, смотритель порядка",
  user: "Здравствуй, пользователь",
  guest: "Здравствуй, гость",
};

const greetByRole = (role: string): string =>
  roleToGreeting[role] ?? "Привет, некто";

console.log(greetByRole("admin")); // "Приветствую, босс"
console.log(greetByRole("ghost")); // "Привет, некто"

// =============================================
// 7. Правила хорошего тона
// =============================================
// - Всегда ставь break (или return), чтобы не было fall-through.
// - Всегда добавляй default - страховка от непредвиденных значений.
// - Меньше 3 case - используй обычный if/else.
// - "Просто соотнести значение со значением" - используй объект-словарь.
// - В TS используй union-типы (Membership, OrderStatus) - они защищают от опечаток.
