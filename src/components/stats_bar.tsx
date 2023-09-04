import { getFormattedTime } from "@/utils/gamestate_utils";
import { GameState } from "@/utils/types";

export default function StatsBar({ gameState }: { gameState: GameState }) {
  let guessStat = `Boards: ${gameState.gamesWon}/${gameState.boards.length}`;
  if (gameState.won) {
    guessStat = `Guesses: ${gameState.guesses}/${gameState.boards.length + 5}`;
  }

  return (
    <div className="flex flex-row justify-between text-white">
      <div className="pr-4">
        Time: {getFormattedTime(structuredClone(gameState.time))}
      </div>
      <div className="pl-4">{guessStat}</div>
    </div>
  );
}
