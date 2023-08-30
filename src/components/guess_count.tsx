export default function GuessCount({
  guesses,
  gamesWon,
  gamesCount,
}: {
  guesses: number;
  gamesWon: number;
  gamesCount: number;
}) {
  let sign = "+";
  let color = "text-white";

  let remainingGuesses = 5 - guesses + gamesWon;
  if (remainingGuesses <= 0) sign = "";
  if (remainingGuesses < 0) color = "text-[#f23636]";

  return (
    <span className={`${color}`}>
      Guesses: {guesses}/{gamesCount + 5} ({sign}
      {remainingGuesses})
    </span>
  );
}
