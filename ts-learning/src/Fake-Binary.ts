export const fakeBin = (x: string): string => {
  let result = "";

  for (let i = 0; i < x.length; i++) {
    if (Number(x[i]) >= 5) {
      result += "1";
    } else {
      result += "0";
    }
  }
  return result;
};

// export const fakeBin = (x:string):string => x.split("").map(d => +d < 5 ? "0" : "1").join("")
