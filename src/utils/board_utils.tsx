import { GameState, BoardInfo, WordInfo } from "@/utils/types";

export function countWon(state: GameState): number {
  let count = 0;

  for (let i = 0; i < state.boards.length; i++) {
    if (state.boards[i].won === true) count++;
  }

  return count;
}

export function updateBoard(board: BoardInfo, currentGuess: string): BoardInfo {
  let guessWord = board.guessWord;

  for (let i = 0; i < 5; i++) {
    if (currentGuess[i] === board.guessWord[i]) {
      board.words[board.words.length - 1][i].color = "green";
      board.greens[i] = {
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
        if (
          !board.yellows.some(
            (pair) => pair.letter === currentGuess[i] && pair.index === i
          )
        ) {
          board.yellows.push(
            structuredClone({ letter: currentGuess[i], index: i })
          );
        }
        remainingLetters.splice(remainingLetters.indexOf(currentGuess[i]), 1);
      } else if (
        board.yellows.some((pair) => pair.letter === currentGuess[i])
      ) {
        board.words[board.words.length - 1][i].color = undefined;
        board.yellows.push(
          structuredClone({ letter: currentGuess[i], index: i })
        );
      } else {
        board.words[board.words.length - 1][i].color = undefined;
        
        if (!board.grays.includes(currentGuess[i])) {
          board.grays += currentGuess[i];
        }
      }
    }
  }

  board.words.push(structuredClone(board.greens));
  return board;
}

export function validGuess(board: BoardInfo, currentGuess: string): boolean {
  for (let i = 0; i < currentGuess.length; i++) {
    if (board.greens[i].letter) {
      if (currentGuess[i] !== board.greens[i].letter) return false;
      else continue;
    }

    if (
      board.yellows.some(
        (pair) => pair.letter === currentGuess[i] && pair.index === i
      )
    )
      return false;

    if (board.grays.includes(currentGuess[i])) return false;
  }

  if (currentGuess.length === 5) {
    for (var pair of board.yellows) {
      if (!currentGuess.includes(pair.letter)) return false;
    }
  }

  return true;
}
