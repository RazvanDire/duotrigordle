import { WordInfo, Color, GameState } from "@/utils/types";
import { WORDS_TARGET } from "@/utils/wordlist";

export function changeColor(
  word: WordInfo,
  newColor: Color,
  index?: number
): WordInfo {
  return word.map((oldLetter, pos) => {
    if (index && pos >= index) return { ...oldLetter };
    return { ...oldLetter, color: newColor };
  }) as WordInfo;
}

export function pickWords(wordCount: number) {
  return WORDS_TARGET.sort(() => 0.5 - Math.random()).slice(0, wordCount);
}

export function clearGuess(state: GameState): GameState {
  state.letterIndex = 0;
  state.currentGuess = "";

  state.boards.map((oldBoard) => {
    if (oldBoard.won) return oldBoard;

    oldBoard.words[oldBoard.words.length - 1] = structuredClone(oldBoard.greens);
  })

  return { ...state };
}