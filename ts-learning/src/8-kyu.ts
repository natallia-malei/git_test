
// Categorize New Member
export function openOrSenior(data: number[][]): string[] {
  return data.map(([age, handicap]) => {
    if (age >= 55 && handicap > 7) {
      return "Senior";
    }
    return "Open";
  });
}

// export function openOrSenior(data: number[][]): string[] {
//   return data.map(([age, handicap]) =>
//     age >= 55 && handicap > 7 ? "Senior" : "Open"
//   );
// }




// Convert boolean values to strings 'Yes' or 'No'.
export const boolToWord = (bool: boolean): string => {
  return bool ? "Yes" : "No";
};


export const zeroFuel = (
  distance: number,
  mpg: number,
  fuelLeft: number,
): boolean => {
  return mpg * fuelLeft >= distance;
};

// Convert a Boolean to a String
export const booleanToString = (b: boolean): string => {
  return b.toString();
};

// Opposites Attract
export function lovefunc(flower1: number, flower2: number): boolean {
  if (
    (flower1 % 2 === 0 && flower2 % 2 !== 0) ||
    (flower1 % 2 !== 0 && flower2 % 2 === 0)
  ) {
    return true;
  } else return false;
}

// return flower1 % 2 !== flower2 % 2

// DNA to RNA Conversion
export function DNAtoRNA(dna: string): string {
  let result = "";

  for (let i = 0; i < dna.length; i++) {
    if (dna[i] === "T") {
      result += "U";
    } else {
      result += dna[i];
    }
  }
  return result;
}

// Дан массив чисел. Верни сумму всех положительных.
export const sum = (n: number[]): number => { 
  return n.reduce((total, x) => {
    if (x > 0) return total + x;
    return total; 
  }, 0);
};

// Перемножь все элементы массива.
export const mult = (n: number[]): number => {
  return n.reduce((result, x) => {
    return result * x;
  }, 1);
}; 

// export const sum = (n: number[]): number =>
//   n.reduce((total, x) => (x > 0 ? total + x : total), 0);

// return dna.split("T").join("U");

//Rock Paper Scissors
export function rps(p1: string, p2: string): string {
  if (p1 === p2) {
    return "Draw!";
  }
  if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "rock")
  ) {
    return "Player 1 won!";
  }
  return "Player 2 won!";
}


// export function points(games: string[]): number {
//   let total = 0;

//   for (const game of games) {
//     const [x, y] = game.split(":").map(Number);
//     if (x > y) total += 3;
//     else if (x === y) total += 1;
//   }
//   return total;
// }

export function points(games: string[]): number {
return games.reduce((total, game) => {
  const [x, y] = game.split(":").map(Number);
  if (x > y) return total + 3;
  if (x === y) return total + 1;
  return total;
}, 0);


// interface Book1 {
//   title: string;
//   author: string;
//   pages: number;
// }

// interface AudioBook extends Book1 {
//   durationMinutes: number;
// }

// interface EBook extends Book1 {
//   fileSizeKb: number;
// }

// type Book = {
//   readonly id: number;
//   readonly year?: number;
//   subtitle?: string;
//   title: string;
//   author: string;
//   pages: number;
// };

// const myBook: Book = {
//   id: 123,
//   title: "The Hobbit",
//   author: "J.R.R. Tolkien",
//   pages: 310,
// };

// const book2: Book = {
//   id: 124,
//   year: 1989,
//   title: "Brief History of Time",
//   author: "Hawking",
//   pages: 240,
//   subtitle: "From the Big Bang to Black Holes",
// };

// export const describeBook = (book: Book): string => {
//   if (book.subtitle !== undefined) {
//     return `"${book.title}: ${book.subtitle}" by ${book.author}, ${book.pages} pages`;
//   }
//   return `"${book.title}" by ${book.author}, ${book.pages} pages`;
// };

// const num: number[] = [1,2,3];
// const nums2: Array<number> = [1, 2, 3];

// const library: Book[] = [
//   { title: "The Hobbit", author: "Tolkien", pages: 310 },
//   { title: "1984", author: "Orwell", pages: 328 },
// ];

// const titles = library.map(b => b.title);
// const long = library.filter(b => b.pages > 150);   // тип: Book[]
// const total = library.reduce((sum, b) => sum + b.pages, 0);   // тип: number

// type Translations = {
//   [word: string]: string;
// };

// const ru: Translations = {
//   hello: "привет",
//   world: "мир",
//   cat: "кошка",