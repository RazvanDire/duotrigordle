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
  alreadyGuessed: WordInfo;
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
