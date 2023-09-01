import { BoardInfo } from "@/utils/types";
import Board from "./board";

export default function Grid({ boards }: { boards: BoardInfo[] }) {
  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-y-scroll no-scrollbar">
      {boards.map((board, index) => (
        <Board board={board} key={index} />
      ))}
    </div>
  );
}
