import { getGlobalKeyColor, getKeyColor } from "@/utils/keyboard_utils";
import Key from "./key";
import { Action, ActionType, BoardInfo } from "@/utils/types";

export default function Keyboard({
  dispatchGameState,
  boards,
  selectedBoard,
  usedLetters,
}: {
  dispatchGameState: (v: Action) => void;
  boards: BoardInfo[];
  selectedBoard: number | undefined;
  usedLetters: string;
}) {
  let firstRow = "QWERTYUIOP".split("");
  let secondRow = "ASDFGHJKL".split("");
  let thirdRow = "ZXCVBNM".split("");

  let callBack = (letter: string) => {
    switch (letter) {
      case "⌫":
        dispatchGameState({ actionType: ActionType.BACKSPACE });
        break;
      case "↵":
        dispatchGameState({ actionType: ActionType.ENTER });
        break;
      default:
        dispatchGameState({ actionType: ActionType.LETTER, letter: letter });
        break;
    }
  };

  return (
    <div className="flex flex-col items-center pt-8 lg:py-8 w-screen lg:w-auto">
      <div className="flex flex-row w-full lg:w-auto flex justify-center">
        {firstRow.map((letter, index) => (
          <Key
            letter={letter}
            key={index}
            onClick={callBack}
            color={
              selectedBoard !== undefined
                ? getKeyColor(letter, boards[selectedBoard])
                : getGlobalKeyColor(letter, usedLetters)
            }
          />
        ))}
      </div>
      <div className="flex flex-row w-9/10 lg:w-auto flex justify-center">
        {secondRow.map((letter, index) => (
          <Key
            letter={letter}
            key={index + 10}
            onClick={callBack}
            color={
              selectedBoard !== undefined
                ? getKeyColor(letter, boards[selectedBoard])
                : getGlobalKeyColor(letter, usedLetters)
            }
          />
        ))}
      </div>
      <div className="flex flex-row w-full lg:w-auto flex justify-center">
        <Key letter="↵" large onClick={callBack} />
        {thirdRow.map((letter, index) => (
          <Key
            letter={letter}
            key={index + 20}
            onClick={callBack}
            color={
              selectedBoard !== undefined
                ? getKeyColor(letter, boards[selectedBoard])
                : getGlobalKeyColor(letter, usedLetters)
            }
          />
        ))}
        <Key letter="⌫" large onClick={callBack} />
      </div>
    </div>
  );
}
