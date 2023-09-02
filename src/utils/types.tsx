export interface GameState {
  boards: BoardInfo[];
  guesses: number;
  letterIndex: number;
  currentGuess: string;
  gamesWon: number;
  selectedBoard?: number;
}

export interface BoardInfo {
  guessWord: string;
  words: WordInfo[];
  won: boolean;
  greens: WordInfo;
  yellows: YellowList[];
  grays: string;
}

export type WordInfo = [
  LetterInfo,
  LetterInfo,
  LetterInfo,
  LetterInfo,
  LetterInfo
];

export type LetterInfo = {
  letter: string;
  color?: Color;
};

export type Color =
  | "yellow"
  | "green"
  | "guess"
  | "not-word"
  | "bad-guess"
  | "known";

export type KeyColor = "yellow" | "green" | "gray";

export enum ActionType {
  LETTER,
  ENTER,
  BACKSPACE,
  SELECT,
}

export interface Action {
  actionType: ActionType;
  letter?: string;
  boardNumber?: number;
}

export interface YellowList {
  letter: string;
  index: number;
}
