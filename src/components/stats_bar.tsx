import { getFormattedTime } from "@/utils/gamestate_utils";
import { GameState } from "@/utils/types";

export default function StatsBar({ gameState }: { gameState: GameState }) {
  let guessStat = `Boards: ${gameState.gamesWon}/${gameState.boards.length}`;
  if (gameState.state === "won") {
    guessStat = `Guesses: ${gameState.guesses}/${gameState.boards.length + 5}`;
  }

  let pause = "";
  if (gameState.state === "paused") pause = " (paused)";

  return (
    <div className="text-sm md:text-base pt-2 flex flex-row justify-between text-white">
      <div className="pr-4">
        Time{pause}: {getFormattedTime(structuredClone(gameState.time))}
      </div>
      <div className="pl-4">{guessStat}</div>
    </div>
  );
}
