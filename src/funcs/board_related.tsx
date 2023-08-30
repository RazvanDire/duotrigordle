import { GameState, BoardInfo, WordInfo } from "@/utils/types";

export function countWon(state: GameState): number {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if (state.boards[i].won === true) count++;
  }
  return count;
}

export function updateBoard(board: BoardInfo, currentGuess: string): BoardInfo {
  let guessWord = board.guessWord;

  for (let i = 0; i < 5; i++) {
    if (currentGuess[i] === board.guessWord[i]) {
      board.words[board.words.length - 1][i].color = "green";
      board.alreadyGuessed[i] = {
        letter: board.guessWord[i],
		color: "known",
      };
      guessWord = guessWord.slice(0, i) + " " + guessWord.slice(i + 1, 5);
    }
  }

  const remainingLetters = guessWord.split("").filter((c) => c !== " ");

  if (remainingLetters.length === 0) {
    board.won = true;

    return board;
  }

  for (let i = 0; i < 5; i++) {
    if (board.words[board.words.length - 1][i].color !== "green") {
      if (remainingLetters.includes(currentGuess[i])) {
        board.words[board.words.length - 1][i].color = "yellow";
        remainingLetters.splice(remainingLetters.indexOf(currentGuess[i]), 1);
      } else {
        board.words[board.words.length - 1][i].color = undefined;
      }
    }
  }

  console.log(board.alreadyGuessed);
  board.words.push(board.alreadyGuessed);
  //board.words.push(Array(5).fill({ letter: "", color: "guess" }) as WordInfo);
  console.log(board.words)
  return board;
}
