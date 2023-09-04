export default function EndMessage({ won }: { won: boolean }) {
  let message = "You lost !";
  let cssLetterColor = "text-[#f23636]";
  if (won) {
    message = "You won !";
    cssLetterColor = "text-[#49d088]";
  }

  return (
    <div className={`text-xl md:text-3xl font-bold flex justify-center ${cssLetterColor}`}>
      {message}
    </div>
  );
}
