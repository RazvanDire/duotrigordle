import { BoardInfo } from "@/types";
import Board from "./board";

export default function Grid({ boards }: { boards: BoardInfo[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 h-5/6 overflow-y-scroll">
      {boards.map((board, index) => (
        <Board board={board} key={index} />
      ))}
    </div>
  );
}
