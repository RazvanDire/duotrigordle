import { BoardInfo, State } from "@/utils/types";
import Solution from "./solution";

export default function SolutionGrid({
  boards,
  state,
}: {
  boards: BoardInfo[];
  state: State;
}) {
  return (
    <div className="flex flex-col grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 md:gap-3 pt-2">
      {boards.map((board, index) => (
        <Solution
          solution={board.solution}
          won={board.won}
          state={state}
          key={index}
        />
      ))}
    </div>
  );
}
