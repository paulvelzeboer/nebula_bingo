export interface BingoCard {
  id: string;
  serial: string;
  grid: (number | 'FREE')[][];
  marked: boolean[][];
}

export type View = 'generator' | 'caller' | 'cards';

export interface GameState {
  drawnNumbers: number[];
  remainingNumbers: number[];
  activeCards: BingoCard[];
}
