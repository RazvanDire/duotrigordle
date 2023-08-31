export default function Key({
  letter,
  large,
  onClick,
}: {
  letter: string;
  large?: boolean;
  onClick: (l: string) => void;
}) {
  let cssBgColor = "bg-[#73738c]";
  let cssLetterColor = "text-white";

  return (
    <button
      onClick={() => onClick(letter)}
      className={`${large ? "w-12 h-8" : "w-8 h-8"} ${
        large ? "w-[4.5rem] h-12" : "w-12 h-12"
      } border border-black flex justify-center items-center rounded font-medium ${cssBgColor}`}
    >
      <span className={`${cssLetterColor}`}>{letter}</span>
    </button>
  );
}
