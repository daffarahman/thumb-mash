export function calculateElo(
  ratingA: number,
  ratingB: number,
  scoreA: number,
  kFactor: number = 32
): [number, number] {
  // Expected scores
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 - expectedA;

  // New ratings
  const newRatingA = ratingA + kFactor * (scoreA - expectedA);
  const newRatingB = ratingB + kFactor * (1 - scoreA - expectedB);

  return [Math.round(newRatingA), Math.round(newRatingB)];
}
