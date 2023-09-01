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
  let whl = "w-12 h-12"
  let wh = "w-8 h-8"

  if (large) {
    whl = "w-[4.5rem] h-12"
    wh = "w-12 h-8"
  }

  return (
    <button
      onClick={() => onClick(letter)}
      className={`${wh} border border-black flex justify-center items-center rounded font-medium ${cssBgColor}`}
    >
      <span className={`${cssLetterColor}`}>{letter}</span>
    </button>
  );
}
