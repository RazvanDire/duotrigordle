import { GameState, Action, ActionType } from "@/utils/types";
import { WORDS_VALID } from "@/utils/wordlist";
import { updateBoard, validGuess } from "./board_utils";
import { changeColor, clearGuess } from "./word_utils";
import { getFormattedTime, getUsedLetters } from "./gamestate_utils";

export default function reducer(openModal: () => void) {
  return (state: GameState, action: Action): GameState => {
    if (state.ended) return { ...state };

    if (action.actionType === ActionType.ENTER) {
      if (state.letterIndex < 4) {
        return clearGuess(state);
      } else if (!WORDS_VALID.has(state.currentGuess)) {
        return clearGuess(state);
      } else {
        if (state.guesses === 0) {
          const d = new Date();
          state.time = d.getTime();
        }

        state.guesses++;
        if (state.guesses >= state.boards.length + 5) state.ended = true;

        state.boards = state.boards.map((oldBoard) => {
          if (oldBoard.won) return oldBoard;

          const updatedBoard = updateBoard(
            oldBoard,
            state.currentGuess,
            state.ended
          );
          if (updatedBoard.won) {
            state.selectedBoard = undefined;
            state.gamesWon++;

            if (state.gamesWon === state.boards.length) state.won = true;
          }

          return updatedBoard;
        });

        if (state.won || state.guesses === state.boards.length + 5) {
          const d = new Date();
          state.time = d.getTime() - state.time;

          openModal();
        }

        return {
          ...state,
          letterIndex: 0,
          usedLetters: getUsedLetters(state.currentGuess, state.usedLetters),
          currentGuess: "",
        };
      }
    }
    if (action.actionType === ActionType.BACKSPACE) {
      if (state.letterIndex > 0) {
        state.letterIndex--;
        state.currentGuess = state.currentGuess.slice(0, -1);

        state.boards = state.boards.map((oldBoard) => {
          if (oldBoard.won) return oldBoard;

          oldBoard.words[oldBoard.words.length - 1][state.letterIndex] = {
            ...oldBoard.greens[state.letterIndex],
          };

          if (state.currentGuess && validGuess(oldBoard, state.currentGuess)) {
            oldBoard.words[oldBoard.words.length - 1] = changeColor(
              oldBoard.words[oldBoard.words.length - 1],
              "guess",
              state.letterIndex
            );
          }

          return oldBoard;
        });

        if (state.letterIndex === 4) {
          state.boards.map((oldBoard) => {
            if (oldBoard.won) return oldBoard;

            if (validGuess(oldBoard, state.currentGuess)) {
              oldBoard.words[oldBoard.words.length - 1] = changeColor(
                oldBoard.words[oldBoard.words.length - 1],
                "guess"
              );
            } else {
              oldBoard.words[oldBoard.words.length - 1] = changeColor(
                oldBoard.words[oldBoard.words.length - 1],
                "bad-guess",
                state.letterIndex
              );
            }

            oldBoard.words[oldBoard.words.length - 1][4] = {
              ...oldBoard.greens[4],
            };
          });
        }
      }
      return { ...state };
    }
    if (action.actionType === ActionType.LETTER) {
      if (state.letterIndex < 5) {
        state.boards.map((oldBoard) => {
          if (oldBoard.won) return oldBoard;

          oldBoard.words[oldBoard.words.length - 1][state.letterIndex] = {
            letter: action.letter!,
            color: "guess",
          };

          return oldBoard;
        });
        state.letterIndex++;
        state.currentGuess += action.letter;

        state.boards.map((oldBoard) => {
          if (oldBoard.won || validGuess(oldBoard, state.currentGuess)) {
            return oldBoard;
          } else {
            oldBoard.words[oldBoard.words.length - 1] = changeColor(
              oldBoard.words[oldBoard.words.length - 1],
              "bad-guess",
              state.letterIndex
            );
          }
        });

        if (state.letterIndex === 5 && !WORDS_VALID.has(state.currentGuess)) {
          state.boards.map((oldBoard) => {
            if (oldBoard.won) return oldBoard;

            oldBoard.words[oldBoard.words.length - 1] = changeColor(
              oldBoard.words[oldBoard.words.length - 1],
              "not-word"
            );
          });
        }
      }

      return { ...state };
    }

    if (action.actionType === ActionType.SELECT) {
      state.selectedBoard = action.boardNumber;

      return { ...state };
    }

    return { ...state };
  };
}
