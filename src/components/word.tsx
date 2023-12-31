import LetterSquare from "./letter_square";
import { LetterInfo, WordInfo } from "@/utils/types";

export default function Word({ word }: { word: WordInfo }) {
  return (
    <div className="word flex flex-row">
      {word.slice(0, 5).map(({ letter, color }, index) => (
        <LetterSquare letter={letter} color={color} key={index}/>
      ))}
    </div>
  );
}
