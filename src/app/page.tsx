"use client";
import { ActionType, GameState, State } from "@/utils/types";
import { useEffect, useReducer } from "react";
import Grid from "@/components/grid";
import Hotbar from "@/components/hotbar";
import reducer from "@/utils/reducer";
import Keyboard from "@/components/keyboard";
import { MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { newGameState } from "@/utils/gamestate_utils";
import StatsModal from "@/components/statistics_modal";

export default function App() {
  const BOARD_COUNT = 32;
  const [opened, { open, close }] = useDisclosure(false);

  const [gameState, dispatchGameState] = useReducer(
    reducer(open),
    newGameState(BOARD_COUNT)
  );

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
      }),
    []
  );

  let openPause = (gameState: GameState) => {
    if (gameState.state === "ongoing") {
      gameState.state = "paused";

      if (gameState.guesses) {
        const d = new Date();
        gameState.time += d.getTime() - gameState.startTime;
      }
    }
    open();
  };

  let closeUnpause = (gameState: GameState) => {
    close();
    if (gameState.state === "paused") {
      gameState.state = "ongoing";

      const d = new Date();
      gameState.startTime = d.getTime();
    }
  };

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <div className="h-full w-full flex justify-center items-center bg-zinc-900 flex-col">
        <div className="min-h-0 flex flex-col basis-0 grow">
          <Hotbar gameState={gameState} open={openPause} />
          <Grid
            boards={gameState.boards}
            dispatchGameState={dispatchGameState}
            selectedBoard={gameState.selectedBoard}
          />
        </div>
        <Keyboard
          dispatchGameState={dispatchGameState}
          boards={gameState.boards}
          selectedBoard={gameState.selectedBoard}
          usedLetters={gameState.usedLetters}
        />
        <StatsModal
          opened={opened}
          close={closeUnpause}
          gameState={gameState}
          dispatchGameState={dispatchGameState}
        />
      </div>
    </MantineProvider>
  );
}
