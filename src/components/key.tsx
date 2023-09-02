import { KeyColor } from "@/utils/types";

export default function Key({
  letter,
  large,
  onClick,
  color,
}: {
  letter: string;
  large?: boolean;
  onClick: (l: string) => void;
  color?: KeyColor;
}) {
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
    case "gray":
      cssBgColor = "bg-[#2e2e38]";
      cssLetterColor = "text-white/50";
  }

  return (
    <button
      onClick={() => onClick(letter)}
      className={`${
        large
          ? "flex-1.5 w-full h-10 lg:w-[4.5rem] lg:h-12"
          : "flex-1 w-full  h-10 lg:w-12 lg:h-12"
      } border border-black flex justify-center items-center rounded font-medium ${cssBgColor}`}
    >
      <span className={`${cssLetterColor}`}>{letter}</span>
    </button>
  );
}
