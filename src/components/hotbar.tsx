import { GameState } from "@/utils/types";
import GuessCount from "./guess_count";

export default function Hotbar({ gameState }: { gameState: GameState }) {
  return (
    <div className="pt-8 flex items-end flex-row justify-between">
      <div className="text-white">
        Boards: {gameState.gamesWon}/{gameState.boards.length}
      </div>
      <GuessCount
        guesses={gameState.guesses}
        gamesWon={gameState.gamesWon}
        gamesCount={gameState.boards.length}
      />
    </div>
  );
}
