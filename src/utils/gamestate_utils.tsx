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
