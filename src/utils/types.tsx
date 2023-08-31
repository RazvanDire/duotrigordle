export interface GameState {
  boards: BoardInfo[];
  guesses: number;
  letterIndex: number;
  currentGuess: string;
  gamesWon: number;
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

export enum ActionType {
  LETTER,
  ENTER,
  BACKSPACE,
}

export interface Action {
  actionType: ActionType;
  letter?: string;
}

export interface YellowList {
  letter: string;
  index: number;
}