import { LetterInfo } from "@/utils/types";

export default function LetterSquare({ letter, color }: LetterInfo) {
  let cssBgColor = "bg-[#73738c]";
  let cssLetterColor = "text-white";

  switch (color) {
    case "yellow":
      cssBgColor = "bg-[#eabf3e]";
      cssLetterColor = "text-black";
      break;
    case "green":
      cssBgColor = "bg-[#49d088]";
      cssLetterColor = "text-black";
      break;
    case "guess":
      cssBgColor = "bg-[#2e2e38]";
      cssLetterColor = "text-white";
      break;
    case "not-word":
      cssBgColor = "bg-[#2e2e38]";
      cssLetterColor = "text-[#f23636]";
      break;
    case "bad-guess":
      cssBgColor = "bg-[#2e2e38]";
      cssLetterColor = "text-[#eabf3e]";
      break;
    case "known":
      cssBgColor = "bg-[#2e2e38]";
      cssLetterColor = "text-white/50";
  }

  return (
    <div
      className={`letter w-8 h-8 border border-black flex justify-center items-center ${cssBgColor} font-medium`}
    >
      <span className={`text-2xl ${cssLetterColor}`}>{letter}</span>
    </div>
  );
}
