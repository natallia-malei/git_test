export const reverseSeq = (n: number): number[] => {
  const arr: number[] = [];
  for (let i = n; i > 0; i--) {
    arr.push(i);
  }
  return arr;
};
