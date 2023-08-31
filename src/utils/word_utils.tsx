import { WordInfo, Color } from "@/utils/types";
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
