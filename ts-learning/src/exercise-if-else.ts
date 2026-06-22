// УПРАЖНЕНИЕ: if / else if / else
// ================================================
//
// Напиши функцию `calculateFinalPrice(amount, isVIP)`, которая
// рассчитывает итоговую цену заказа с учетом скидки.
//
// Правила скидок (проверять В ТАКОМ порядке):
//   1. Если клиент VIP        - скидка 25% (независимо от суммы)
//   2. Иначе если сумма >= 5000 - скидка 15%
//   3. Иначе если сумма >= 2000 - скидка 10%
//   4. Иначе                    - скидки нет
//
// Функция должна вернуть число - сумму с учётом скидки.
//
// Подсказки:
//   - Параметры: amount (number), isVIP (boolean)
//   - Возвращаем: number
//   - Формула скидки: amount * (1 - процент / 100)
//     Например, скидка 25% от 1000: 1000 * (1 - 25 / 100) = 750
//
// Примеры:
//   calculateFinalPrice(1000, true)  -> 750   (VIP, скидка 25%)
//   calculateFinalPrice(6000, false) -> 5100  (15% от 6000 = 900, остается 5100)
//   calculateFinalPrice(3000, false) -> 2700  (10% от 3000 = 300, остается 2700)
//   calculateFinalPrice(500,  false) -> 500   (скидки нет)
//   calculateFinalPrice(500,  true)  -> 375   (VIP важнее суммы, скидка 25%)

export function calculateFinalPrice(amount: number, isVIP: boolean): number {
  if (isVIP === true) {
    return amount * (1 - 25 / 100);
  } else if (amount >= 5000) {
    return amount * (1 - 15 / 100);
  } else if (amount >= 2000) {
    return amount * (1 - 10 / 100);
  } else return amount;
}

const getDiscountRate = (amount: number, isVIP: boolean): number => {
  if (isVIP) return 0.25;
  if (amount >= 5000) return 0.15;
  if (amount >= 2000) return 0.10;
  return 0;
};

export const calculatelPrice = (amount: number, isVIP: boolean): number =>
  amount * (1 - getDiscountRate(amount, isVIP));


