import Word from "./word";
import { BoardInfo, WordInfo } from "@/utils/types";

export default function Board({ board }: { board: BoardInfo }) {
  let opacity = "opacity-100";
  if (board.won) opacity = "opacity-25";

  return (
    <div className={`flex flex-col ${opacity}`}>
      {board.words.map((word, index) => (
        <Word word={word} key={index} />
      ))}
    </div>
  );
}
