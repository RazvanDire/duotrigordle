import { BoardInfo } from "@/utils/types";
import Board from "./board";

export default function Grid({ boards }: { boards: BoardInfo[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 h-5/6 overflow-y-scroll">
      {boards.map((board, index) => (
        <Board board={board} key={index} />
      ))}
    </div>
  );
}
