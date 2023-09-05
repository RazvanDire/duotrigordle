import { GameState, State } from "@/utils/types";
import GuessCount from "./guess_count";

export default function Hotbar({
  gameState,
  open,
}: {
  gameState: GameState;
  open: (g: GameState) => void;
}) {
  return (
    <div className="text-sm md:text-base pt-6 flex flex-row pb-2">
      <div className="text-white pb-1 pt-1 w-2/5 flex justify-start">
        Boards: {gameState.gamesWon}/{gameState.boards.length}
      </div>
      <div className="text-black w-1/5 flex justify-center">
        <button onClick={() => open(gameState)} className="bg-violet-400 rounded py-2">
          <span className="px-2 text-black">Menu</span>
        </button>
      </div>

      <GuessCount
        guesses={gameState.guesses}
        gamesWon={gameState.gamesWon}
        gamesCount={gameState.boards.length}
      />
    </div>
  );
}
