// Реальные сценарии if/else в TS-коде
// ====================================

// =============================================
// Пример 1: валидация формы (логин / регистрация)
// =============================================
// Часто валидация возвращает либо "всё ок", либо причину ошибки.
// Union-тип ValidationResult описывает все возможные исходы.

type ValidationResult =
  | { ok: true }
  | { ok: false; reason: "email-empty" | "email-invalid" | "password-short" };

const validateLoginForm = (
  email: string,
  password: string,
): ValidationResult => {
  if (email.trim() === "") {
    return { ok: false, reason: "email-empty" };
  }
  if (!email.includes("@")) {
    return { ok: false, reason: "email-invalid" };
  }
  if (password.length < 8) {
    return { ok: false, reason: "password-short" };
  }
  return { ok: true };
};

// Использование:
const result = validateLoginForm("user@example.com", "secret123");
if (result.ok) {
  console.log("Форма валидна, отправляем на сервер");
} else {
  // TS знает: тут result точно { ok: false, reason: ... }
  console.log("Ошибка:", result.reason);
}

// =============================================
// Пример 2: обработка ответа от API
// =============================================
// Сетевой запрос может упасть, ответ может быть не 200,
// тело может оказаться невалидным. Каждый случай - своя ветка.

type User = { id: number; name: string };

const loadUser = async (id: number): Promise<User | null> => {
  const response = await fetch(`/api/users/${id}`);

  if (response.status === 404) {
    console.log("Пользователь не найден");
    return null;
  }

  if (!response.ok) {
    // .ok это true для статусов 200-299, false для остального
    console.log("Ошибка сервера:", response.status);
    return null;
  }

  const data: User = await response.json();
  return data;
};

// =============================================
// Пример 3: проверка прав доступа
// =============================================
// Перед действием проверяем: вошёл ли пользователь, его роль,
// и кому принадлежит объект, который он трогает.

type Role = "admin" | "editor" | "viewer";

type CurrentUser = {
  id: number;
  role: Role;
} | null; // null = не залогинен

type Post = {
  id: number;
  authorId: number;
  title: string;
};

const canEditPost = (user: CurrentUser, post: Post): boolean => {
  // Не залогинен - сразу нет
  if (user === null) return false;

  // После этой строки TS знает, что user точно не null,
  // и разрешает обращаться к user.role и user.id.

  // Админ может всё
  if (user.role === "admin") return true;

  // Редактор может править свои посты
  if (user.role === "editor" && user.id === post.authorId) return true;

  // Все остальные случаи (viewer, чужой пост) - нельзя
  return false;
};

// Использование:
const me: CurrentUser = { id: 7, role: "editor" };
const somePost: Post = { id: 100, authorId: 7, title: "Мой пост" };

if (canEditPost(me, somePost)) {
  console.log("Можно редактировать");
} else {
  console.log("Нет прав");
}
