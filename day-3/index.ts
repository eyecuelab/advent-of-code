import log from "npmlog";
import { TEST_INPUT as input } from "./puzzle-input";

export type Rucksacks = string;

export const TEST_INPUT = input;
// lower 97 - 122
// upper 65 - 90
function priority(letter: string): number {
  const ascii = letter.charCodeAt(0);

  const offset = ascii >= 97 ? 96 : 38;

  return ascii - offset;
}

export function dayThree(puzzleInput: Rucksacks): number {
  // parse input into sacks
  const arrayOfRucksacks = puzzleInput.split(`\n`);

  return arrayOfRucksacks.reduce((sum, sack) => {
    // record of encountered letters
    const letters: Record<string, boolean | undefined> = {};
    // loop thorugh the sack
    for (let i = 0; i < sack.length; i++) {
      // if in the first sack record what we have
      if (i < sack.length / 2) {
        letters[sack[i]] = true;
      } else {
        // if in the second sack check for duplicates
        if (letters[sack[i]]) {
          // dont do this again
          letters[sack[i]] = false;
          // add the priority of this item
          const itemPriority = priority(sack[i]);
          sum += itemPriority;
          // log.info(
          //   `day-three`,
          //   `letter: ${sack[i]}, priority: ${itemPriority}, sum: ${sum}`
          // );
        }
      }
    }
    // return accumulator for next sack
    return sum;
  }, 0);
}


type ElfGroup = [string[], string[], string[]];

enum States {
  NotSeen,
  Seen,
  Duplicate
}

const scores = [1, 10, 100];

export function dayThreePartTwo(puzzleInput: Rucksacks): number {
  const arrayOfRucksacks = puzzleInput.split("\n");
  let prioritySum = 0;
  const [rucksack1, r2, r3] = groupOne.map((r) => r.split(""));
  const uniqueLetter = rucksack1
    .filter((letter) => r2.includes(letter))
    .filter((letter) => r3.includes(letter));

  const groupOne = arrayOfRucksacks.slice(0, 3);



  const letterRecord: Record<string, number> = {};

  for (let i = 0; i < groupOne.length; i++) {
    groupOne[i].split("").forEach((letter) => {
      if (letterRecord[letter]) {
        letterRecord[letter] += scores[i];
      } else {
        letterRecord[letter] = scores[i];
      }
    });
  }
  const answer = Object.entries(letterRecord).find(
    ([_, score]) => score === 111
  );
  return priority(answer?[0] ?? '');
}
