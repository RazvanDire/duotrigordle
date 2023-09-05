import { GameState, Action, ActionType } from "@/utils/types";
import { WORDS_VALID } from "@/utils/wordlist";
import { updateBoard, validGuess } from "./board_utils";
import { changeColor, clearGuess } from "./word_utils";
import {
  getFormattedTime,
  getUsedLetters,
  newGameState,
} from "./gamestate_utils";

export default function reducer(openModal: () => void) {
  return (gameState: GameState, action: Action): GameState => {
    if (action.actionType === ActionType.RESTART) gameState = newGameState(32);
    if (gameState.state !== "ongoing") return { ...gameState };

    if (action.actionType === ActionType.ENTER) {
      if (gameState.letterIndex < 4) {
        return clearGuess(gameState);
      } else if (!WORDS_VALID.has(gameState.currentGuess)) {
        return clearGuess(gameState);
      } else {
        if (gameState.guesses === 0) {
          const d = new Date();
          gameState.startTime = d.getTime();
        }

        gameState.guesses++;

        if (gameState.guesses >= gameState.boards.length + 5) {
          gameState.state = "lost";
        }

        gameState.boards = gameState.boards.map((oldBoard) => {
          if (oldBoard.won) return oldBoard;

          const updatedBoard = updateBoard(
            oldBoard,
            gameState.currentGuess,
            gameState.state
          );
          if (updatedBoard.won) {
            gameState.selectedBoard = undefined;
            gameState.gamesWon++;
          }

          return updatedBoard;
        });

        if (gameState.gamesWon === gameState.boards.length) {
          gameState.state = "won";
        }

        if (gameState.state === "won" || gameState.state === "lost") {
          const d = new Date();
          gameState.time += d.getTime() - gameState.startTime;

          openModal();
        }

        return {
          ...gameState,
          letterIndex: 0,
          usedLetters: getUsedLetters(
            gameState.currentGuess,
            gameState.usedLetters
          ),
          currentGuess: "",
        };
      }
    }
    if (action.actionType === ActionType.BACKSPACE) {
      if (gameState.letterIndex > 0) {
        gameState.letterIndex--;
        gameState.currentGuess = gameState.currentGuess.slice(0, -1);

        gameState.boards = gameState.boards.map((oldBoard) => {
          if (oldBoard.won) return oldBoard;

          oldBoard.words[oldBoard.words.length - 1][gameState.letterIndex] = {
            ...oldBoard.greens[gameState.letterIndex],
          };

          if (
            gameState.currentGuess &&
            validGuess(oldBoard, gameState.currentGuess)
          ) {
            oldBoard.words[oldBoard.words.length - 1] = changeColor(
              oldBoard.words[oldBoard.words.length - 1],
              "guess",
              gameState.letterIndex
            );
          }

          return oldBoard;
        });

        if (gameState.letterIndex === 4) {
          gameState.boards.map((oldBoard) => {
            if (oldBoard.won) return oldBoard;

            if (validGuess(oldBoard, gameState.currentGuess)) {
              oldBoard.words[oldBoard.words.length - 1] = changeColor(
                oldBoard.words[oldBoard.words.length - 1],
                "guess"
              );
            } else {
              oldBoard.words[oldBoard.words.length - 1] = changeColor(
                oldBoard.words[oldBoard.words.length - 1],
                "bad-guess",
                gameState.letterIndex
              );
            }

            oldBoard.words[oldBoard.words.length - 1][4] = {
              ...oldBoard.greens[4],
            };
          });
        }
      }
      return { ...gameState };
    }
    if (action.actionType === ActionType.LETTER) {
      if (gameState.letterIndex < 5) {
        gameState.boards.map((oldBoard) => {
          if (oldBoard.won) return oldBoard;

          oldBoard.words[oldBoard.words.length - 1][gameState.letterIndex] = {
            letter: action.letter!,
            color: "guess",
          };

          return oldBoard;
        });
        gameState.letterIndex++;
        gameState.currentGuess += action.letter;

        gameState.boards.map((oldBoard) => {
          if (oldBoard.won || validGuess(oldBoard, gameState.currentGuess)) {
            return oldBoard;
          } else {
            oldBoard.words[oldBoard.words.length - 1] = changeColor(
              oldBoard.words[oldBoard.words.length - 1],
              "bad-guess",
              gameState.letterIndex
            );
          }
        });

        if (
          gameState.letterIndex === 5 &&
          !WORDS_VALID.has(gameState.currentGuess)
        ) {
          gameState.boards.map((oldBoard) => {
            if (oldBoard.won) return oldBoard;

            oldBoard.words[oldBoard.words.length - 1] = changeColor(
              oldBoard.words[oldBoard.words.length - 1],
              "not-word"
            );
          });
        }
      }

      return { ...gameState };
    }

    if (action.actionType === ActionType.SELECT) {
      gameState.selectedBoard = action.boardNumber;

      return { ...gameState };
    }

    return { ...gameState };
  };
}
