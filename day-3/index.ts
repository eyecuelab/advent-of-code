import { TEST_INPUT as input } from "./puzzle-input";
import npmlog from "npmlog";

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

const scores = [1, 10, 100];

export function findBadgeInRucksacks(rucksacks: string[]): string {
	const letterDict: Record<string, number> = {};

	for (let i = 0; i < rucksacks.length; i++) {
		const sack = rucksacks[i];
		for (let j = 0; j < sack.length; j++) {
			const letter = sack[j];
			if (!letterDict[letter]) {
				letterDict[letter] = scores[i];
			}
			if (typeof letterDict[letter] && letterDict[letter] < scores[i]) {
				letterDict[letter] += scores[i];
			}
		}
	}
	const letter = Object.entries(letterDict).find(([_, score]) => score === 111);
	if (!letter) {
		npmlog.info("rucksacks", rucksacks);
		npmlog.info("letterDict", letterDict);
		throw new Error("No letter found");
	}
	return letter[0];
}

export function discoverUniqueLetterAmongRucksacks(
	rucksacks: string[],
): string {
	const setSacks = rucksacks.map((r) => [...new Set(r)]);
	const smallestRucksack = setSacks.sort((a, b) => a.length - b.length)[0];
	const uniqueLetter = smallestRucksack.find((letter) => {
		return setSacks.every((rucksack) =>
			[...new Set(rucksack)].includes(letter),
		);
	});
	if (!uniqueLetter) {
		throw new Error("No unique letter found");
	}
	return uniqueLetter;
}

npmlog.info(
	"unique letter",
	discoverUniqueLetterAmongRucksacks([
		"vJrwpWtwJgWrhcsFMMfFFhFp",
		"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
		"PmmdzqPrVvPwwTWBwg",
	]),
);

export function dayThreePartTwo(puzzleInput: Rucksacks): number {
	const arrayOfRucksacks = puzzleInput.split("\n");
	let prioritySum = 0;
	for (let i = 0; i < arrayOfRucksacks.length; i += 3) {
		const group = arrayOfRucksacks.slice(i, i + 3);
		const uniqueLetter = findBadgeInRucksacks(group);
		prioritySum += priority(uniqueLetter);
	}

	return prioritySum;
}
