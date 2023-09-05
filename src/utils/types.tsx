export interface GameState {
  boards: BoardInfo[];
  guesses: number;
  letterIndex: number;
  currentGuess: string;
  gamesWon: number;
  selectedBoard?: number;
  usedLetters: string;
  time: number;
  startTime: number;
  state: State;
}

export type State = "won" | "lost" | "paused" | "ongoing";

export interface BoardInfo {
  solution: string;
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

export type KeyColor = "yellow" | "green" | "gray" | "lilac";

export enum ActionType {
  LETTER,
  ENTER,
  BACKSPACE,
  SELECT,
  RESTART,
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
