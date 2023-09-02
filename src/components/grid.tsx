import { Action, ActionType, BoardInfo } from "@/utils/types";
import Board from "./board";

export default function Grid({
  selectedBoard,
  boards,
  dispatchGameState,
}: {
  selectedBoard?: number;
  boards: BoardInfo[];
  dispatchGameState: (a: Action) => void;
}) {
  const selectBoardCallBack = (index: number | undefined) => {
    return () => {
      dispatchGameState({ actionType: ActionType.SELECT, boardNumber: index });
    };
  };

  return (
    <div className="flex-1 overflow-y-scroll no-scrollbar">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {boards.map((board, index) => (
          <Board
            board={board}
            key={index}
            onClick={
              !board.won
                ? selectBoardCallBack(
                    selectedBoard === index ? undefined : index
                  )
                : undefined
            }
            selected={selectedBoard === index}
          />
        ))}
      </div>
    </div>
  );
}
