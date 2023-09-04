export default function Solution({
  solution,
  won,
  gameWon,
}: {
  solution: string;
  won: boolean;
  gameWon: boolean;
}) {
  let cssLetterColor = "text-[#49d088]";
  let boldness = "font-semibold";
  if (!gameWon) {
    if (!won) cssLetterColor = "text-[#f23636]";
    else {
      cssLetterColor = "text-white";
      boldness = "";
    }
  }

  return (
    <div className={`text-sm md:text-base ${boldness} flex justify-center ${cssLetterColor}`}>
      {solution}
    </div>
  );
}
