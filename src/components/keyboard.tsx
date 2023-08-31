import Key from "./key";
import { Action, ActionType } from "@/utils/types";

export default function Keyboard({
  dispatchGameState,
}: {
  dispatchGameState: (v: Action) => void;
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
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-row">
        {firstRow.map((letter, index) => (
          <Key letter={letter} key={index} onClick={callBack} />
        ))}
      </div>
      <div className="flex flex-row">
        {secondRow.map((letter, index) => (
          <Key letter={letter} key={index + 10} onClick={callBack} />
        ))}
      </div>
      <div className="flex flex-row">
        <Key letter="⌫" large onClick={callBack} />
        {thirdRow.map((letter, index) => (
          <Key letter={letter} key={index + 20} onClick={callBack} />
        ))}
        <Key letter="↵" large onClick={callBack} />
      </div>
    </div>
  );
}
