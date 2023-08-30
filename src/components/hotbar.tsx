import { GameState } from "@/utils/types";
import GuessCount from "./guess_count";

export default function Hotbar({ gameState }: { gameState: GameState }) {
  return (
    <div className="flex items-end flex-col">
      <GuessCount guesses={gameState.guesses} gamesWon={gameState.gamesWon} />
    </div>
  );
}
