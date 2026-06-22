// export function basicOp(
//   operation: string,
//   value1: number,
//   value2: number,
// ): number {
//   if (operation === "+") {
//     return value1 + value2;
//   } else if (operation === "-") {
//     return value1 - value2;
//   } else if (operation === "*") {
//     return value1 * value2;
//   } else {
//     return value1 / value2;
//   }
// }

export function basicOp(
  operation: string,
  value1: number,
  value2: number,
): number {
  switch (operation) {
    case "+":
      return value1 + value2;
    case "-":
      return value1 - value2;
    case "*":
      return value1 * value2;
    case "/":
      return value1 / value2;
    default:
      throw new Error("Unknown operation: " + operation);
  }
}
