// export const digitize = (n: number): number[] => {
//   const str = n.toString();
//   const arr: number[] = [];
//   for (let i = str.length - 1; i >= 0; i--) {
//     arr.push(Number(str[i]));
//   }
//   return arr;
// };

export const digitize = (n: number): number[] => {
  return [...n.toString()].map(Number).reverse();
};
