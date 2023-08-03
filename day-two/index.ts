import log from "npmlog";
import { sum } from "../day-one";

const Scores = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
  Loss: 0,
  Draw: 3,
  Win: 6,
};

const isDraw = (opponent: string, play: string): boolean => {
  switch (opponent) {
    case "A":
      return play === "X";
    case "B":
      return play === "Y";
    case "C":
      return play === "Z";
  }
  throw new Error(`invalid opponent: ${opponent}`);
};

const getWinScore = (opponent: string, play: string): number => {
  if (isDraw(opponent, play)) {
    return Scores.Draw;
  }

  switch (opponent) {
    case "A":
      return play === "Y" ? Scores.Win : Scores.Loss;
    case "B":
      return play === "Z" ? Scores.Win : Scores.Loss;
    case "C":
      return play === "X" ? Scores.Win : Scores.Loss;
  }
  throw new Error(`invalid opponent: ${opponent}`);
};

const getPlayerItemScore = (play: string): number => {
  switch (play) {
    case "X":
      return Scores.Rock;
    case "Y":
      return Scores.Paper;
    case "Z":
      return Scores.Scissors;
  }
  throw new Error(`invalid play: ${play}`);
};

export * from "./puzzle-input";

type StrategyGuide = string;

export function dayTwo(strategyGuide: StrategyGuide): number {
  /**
   * - parse the input
   *   - split on newlines
   *   - split each line on a space
   *     [A, Y], [B, X], [C, Z]
   * - for each line, determine the score
   * - sum the scores
   */

  const splitIntoRounds = strategyGuide.split("\n");

  return splitIntoRounds
    .map((round) => {
      const [opponent, play] = round.split(" ");
      const winScore = getWinScore(opponent, play);
      const playerScore = getPlayerItemScore(play);

      return winScore + playerScore;
    })
    .reduce(sum, 0);
}
