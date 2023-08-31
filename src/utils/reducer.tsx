import { GameState, Action, ActionType } from "@/utils/types";
import { WORDS_VALID } from "@/utils/wordlist";
import { updateBoard, countWon, validGuess } from "./board_utils";
import { changeColor } from "./word_utils";

export default function reducer(state: GameState, action: Action): GameState {
  if (action.actionType === ActionType.ENTER) {
    if (state.letterIndex < 4) {
      // TODO Add error
      return { ...state };
    } else if (!WORDS_VALID.has(state.currentGuess)) {
      // TODO Add error
      return { ...state };
    } else {
      state.boards = state.boards.map((oldBoard) =>
        oldBoard.won ? oldBoard : updateBoard(oldBoard, state.currentGuess)
      );
      return {
        ...state,
        letterIndex: 0,
        currentGuess: "",
        guesses: state.guesses + 1,
        gamesWon: countWon(state),
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

  return { ...state };
}
