import { GameState } from "@/utils/types";
import GuessCount from "./guess_count";

export default function Hotbar({ gameState }: { gameState: GameState }) {
  return (
    <div className="flex items-end flex-row justify-between">
      <div className="text-white">Boards: {gameState.gamesWon}/32</div>
      <GuessCount guesses={gameState.guesses} gamesWon={gameState.gamesWon} />
    </div>
  );
}
