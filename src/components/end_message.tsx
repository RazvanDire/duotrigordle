import { State } from "@/utils/types";

export default function EndMessage({
  state
}: {
  state: State
}) {
  let message = "Menu";
  let cssLetterColor = "text-white";

  if (state === "won") {
    message = "You won !";
    cssLetterColor = "text-[#49d088]";
  } else if (state === "lost") {
    message = "You lost !";
    cssLetterColor = "text-[#f23636]";
  }

  return (
    <div
      className={`text-xl md:text-3xl font-bold flex justify-center ${cssLetterColor}`}
    >
      {message}
    </div>
  );
}
