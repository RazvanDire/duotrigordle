import { State } from "@/utils/types";

export default function Solution({
  solution,
  won,
  state,
}: {
  solution: string;
  won: boolean;
  state: State;
}) {
  let cssLetterColor = "text-white";
  let boldness = "";

  if (state === "won") {
    cssLetterColor = "text-[#49d088]";
    boldness = "font-semibold";
  } else if (state === "lost") {
    if (!won) {
      cssLetterColor = "text-[#f23636]";
      boldness = "font-semibold";
    }
  } else {
    if (won) {
      cssLetterColor = "text-[#49d088]";
      boldness = "font-semibold";
    }
  }

  return (
    <div
      className={`text-sm md:text-base ${boldness} flex justify-center ${cssLetterColor}`}
    >
      {won || state === "lost" ? solution : "?????"}
    </div>
  );
}
