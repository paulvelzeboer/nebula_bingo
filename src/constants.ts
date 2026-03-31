export const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'] as const;

export const BINGO_RANGES = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
} as const;

export const generateBingoGrid = (): (number | 'FREE')[][] => {
  const grid: (number | 'FREE')[][] = Array(5).fill(null).map(() => Array(5).fill(0));
  
  BINGO_LETTERS.forEach((letter, colIndex) => {
    const [min, max] = BINGO_RANGES[letter];
    const numbers: number[] = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    numbers.sort((a, b) => a - b);
    numbers.forEach((num, rowIndex) => {
      grid[rowIndex][colIndex] = num;
    });
  });
  
  grid[2][2] = 'FREE';
  return grid;
};

export const getBingoLetter = (num: number): string => {
  if (num <= 15) return 'B';
  if (num <= 30) return 'I';
  if (num <= 45) return 'N';
  if (num <= 60) return 'G';
  return 'O';
};
