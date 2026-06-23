export const min = (list: number[]): number => {
  let result = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] < result) {
      result = list[i];
    }
  }
  return result;
};

export const max = (list: number[]): number => {
  let result = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] > result) {
      result = list[i];
    }
  }
  return result;
};

// export const min = (list: number[]): number => {
//   return Math.min(...list);
// };

// export const max = (list: number[]): number => {
//   return Math.max(...list);
// };
