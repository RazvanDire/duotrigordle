import Word from "./word";
import { BoardInfo, WordInfo } from "@/utils/types";

export default function Board({
  board,
  onClick,
  selected,
}: {
  board: BoardInfo;
  onClick?: () => void;
  selected: boolean;
}) {
  let opacity = "opacity-100";
  if (board.won) opacity = "opacity-25";

  return (
    <div
      onClick={onClick}
      className={`board flex flex-col ${opacity} ${
        selected ? "border-2 border-white" : "border-2 border-zinc-900"
      }`}
    >
      {board.words.map((word, index) => (
        <Word word={word} key={index} />
      ))}
    </div>
  );
}
