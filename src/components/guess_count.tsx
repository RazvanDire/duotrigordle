export default function GuessCount({
  guesses,
  gamesWon,
}: {
  guesses: number;
  gamesWon: number;
}) {
  let sign = "+";
  let color = "text-white";

  let remainingGuesses = 5 - guesses + gamesWon;
  if (remainingGuesses <= 0) sign = "";
  if (remainingGuesses < 0) color = "text-[#f23636]";

  return (
    <span className={`${color}`}>
      Guesses: {guesses}/37 ({sign}
      {remainingGuesses})
    </span>
  );
}
