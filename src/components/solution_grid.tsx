import { BoardInfo } from "@/utils/types";
import Solution from "./solution";

export default function SolutionGrid({
  boards,
  won,
  ended,
}: {
  boards: BoardInfo[];
  won: boolean;
  ended: boolean;
}) {
  return (
    <div className="flex flex-col grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 md:gap-3 pt-2">
      {boards.map((board, index) => (
        <Solution
          solution={board.solution}
          won={board.won}
          gameWon={won}
          ended={ended}
          key={index}
        />
      ))}
    </div>
  );
}
