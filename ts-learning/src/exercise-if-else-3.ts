// Високосный год
// ================================================
//
// Напиши функцию isLeapYear(year), которая определяет,
// является ли год високосным.
//
// Год считается високосным, если он делится на 4,
// но НЕ делится на 100, КРОМЕ случаев, когда делится на 400.
//
// Примеры:
//   isLeapYear(2020) -> true
//   isLeapYear(2021) -> false
//   isLeapYear(1900) -> false
//   isLeapYear(2000) -> true
//   isLeapYear(2400) -> true
//   isLeapYear(2100) -> false

export const isLeapYear = (year: number): boolean => {
 return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
