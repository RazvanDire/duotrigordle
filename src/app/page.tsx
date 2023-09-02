"use client";
import Board from "@/components/board";
import {
  Action,
  ActionType,
  BoardInfo,
  Color,
  GameState,
  LetterInfo,
  WordInfo,
} from "@/utils/types";
import { useEffect, useReducer } from "react";
import Grid from "@/components/grid";
import { WORDS_TARGET, WORDS_VALID } from "@/utils/wordlist";
import GuessCount from "@/components/guess_count";
import Hotbar from "@/components/hotbar";
import { changeColor, pickWords } from "@/utils/word_utils"
import reducer from "@/utils/reducer";
import Keyboard from "@/components/keyboard";

export default function App() {
  const WORD_COUNT = 32;

  const [gameState, dispatchGameState] = useReducer(reducer, {
    boards: pickWords(WORD_COUNT).map((guess) => ({
      words: [Array(5).fill({ letter: "", color: "guess" }) as WordInfo],
      guessWord: guess,
      won: false,
      greens: Array(5).fill({ letter: "", color: "known" }) as WordInfo,
      yellows: [],
      grays: "",
    })),
    guesses: 0,
    letterIndex: 0,
    currentGuess: "",
    gamesWon: 0,
  });

  useEffect(
    () =>
      document.addEventListener("keydown", function (event) {
        if (/^[a-zA-Z()]$/.test(event.key)) {
          dispatchGameState({
            actionType: ActionType.LETTER,
            letter: event.key.toUpperCase(),
          });
        } else if (event.code === "Enter") {
          dispatchGameState({ actionType: ActionType.ENTER });
        } else if (event.code === "Backspace") {
          dispatchGameState({ actionType: ActionType.BACKSPACE });
        }
        console.log(
          `Key: ${event.key} with keycode ${event.code} has been pressed`
        );
      }),
    []
  );

  return (
    <div className="h-full w-full flex justify-center items-center bg-zinc-900 flex-col">
      <div className="min-h-0 flex flex-col basis-0 grow">
        <Hotbar gameState={gameState} />
        <Grid boards={gameState.boards} dispatchGameState={dispatchGameState} selectedBoard={gameState.selectedBoard}/>
      </div>
      <Keyboard dispatchGameState={dispatchGameState} boards={gameState.boards} selectedBoard={gameState.selectedBoard}/>
    </div>
    
  );
}
