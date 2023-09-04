import { GameState, WordInfo } from "./types";
import { pickWords } from "./word_utils";

export function getUsedLetters(
  currentGuess: string,
  usedLetters: string
): string {
  let newUsedLetters = structuredClone(usedLetters);

  for (var letter of currentGuess) {
    if (!usedLetters.includes(letter)) newUsedLetters += letter;
  }

  return newUsedLetters;
}

export function newGameState(count: number): GameState {
  return {
    boards: pickWords(count).map((guess) => ({
      words: [Array(5).fill({ letter: "", color: "guess" }) as WordInfo],
      solution: guess,
      won: false,
      greens: Array(5).fill({ letter: "", color: "known" }) as WordInfo,
      yellows: [],
      grays: "",
    })),
    guesses: 0,
    letterIndex: 0,
    currentGuess: "",
    gamesWon: 0,
    usedLetters: "",
    time: 0,
    won: false,
    ended: false,
  };
}

export function getFormattedTime(ms: number): string {
  let time = "";
  let minuteZeros = "";
  let secondZeros = "";
  let msZeros = "";

  let minutes = Math.floor(ms / 60000);
  if (minutes < 10) minuteZeros += "0";
  ms = ms % 60000;

  let seconds = Math.floor(ms / 1000);
  if (seconds < 10) secondZeros += "0";
  ms = ms % 1000;

  if (ms < 100) msZeros += "0";
  if (ms < 10) msZeros += "0";

  return `${minuteZeros}${minutes}:${secondZeros}${seconds}.${msZeros}${ms}`;
}
