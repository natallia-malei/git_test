// УПРАЖНЕНИЕ 2: if / else if / else + union-тип
// ================================================
//
// Напиши функцию `recommendActivity(temperature, isRaining)`,
// которая советует, чем заняться, по погоде.
//
// Правила (проверять В ТАКОМ порядке):
//   1. Если идёт дождь                    -> "stay-home"
//   2. Иначе если температура ниже 5      -> "cold-walk"
//   3. Иначе если температура выше 25     -> "hot-walk"
//   4. Иначе                              -> "nice-walk"
//
// Параметры:
//   temperature: number  (градусы Цельсия, может быть отрицательной)
//   isRaining:   boolean
//
// Возвращаемое значение - одна из ЧЕТЫРЁХ конкретных строк:
//   "stay-home" | "cold-walk" | "hot-walk" | "nice-walk"
//
// Это называется UNION-ТИП. Он уже описан ниже - используй его как тип возврата.
// Если внутри функции попытаешься вернуть строку не из списка,
// например "go-skiing" - TS сразу подсветит ошибку.
//
// Примеры:
//   recommendActivity(20, true)   -> "stay-home"   (дождь главнее всего)
//   recommendActivity(-3, false)  -> "cold-walk"
//   recommendActivity(30, false)  -> "hot-walk"
//   recommendActivity(15, false)  -> "nice-walk"
//   recommendActivity(0, true)    -> "stay-home"   (дождь побеждает холод)

type Activity = "stay-home" | "cold-walk" | "hot-walk" | "nice-walk";

export const recommendActivity = (
  temperature: number,
  isRaining: boolean,
): Activity => {
  if (isRaining) return "stay-home";
  if (temperature < 5) return "cold-walk";
  if (temperature > 25) return "hot-walk";
  return "nice-walk";
};

// Проверка - раскомментируй, когда напишешь функцию:
// console.log(recommendActivity(20, true));   // "stay-home"
// console.log(recommendActivity(-3, false));  // "cold-walk"
// console.log(recommendActivity(30, false));  // "hot-walk"
// console.log(recommendActivity(15, false));  // "nice-walk"
// console.log(recommendActivity(0, true));    // "stay-home"
