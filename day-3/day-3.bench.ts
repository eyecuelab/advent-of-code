import * as v from "vitest";
import { discoverUniqueLetterAmongRucksacks, findBadgeInRucksacks } from ".";

const THE_ALPHABET_LOWER_AND_UPPER_CASE =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function createRucksacks(
	numberOfRucksacks: number,
	largestRucksackSize: number,
): string {
	const randomIndexIntoAlphabet = () =>
		Math.floor(Math.random() * THE_ALPHABET_LOWER_AND_UPPER_CASE.length);

	const randomCommonLetter =
		THE_ALPHABET_LOWER_AND_UPPER_CASE[randomIndexIntoAlphabet()];
	const lettersThatMayNotBeFullyShared =
		THE_ALPHABET_LOWER_AND_UPPER_CASE.replace(randomCommonLetter, "").split("");

	const uniqueLetters = Array.from(
		{ length: numberOfRucksacks },
		(_, i) => i,
	).map(() => {
		// split the nonshared letters into groups for each sack
		const letters: string[] = [];
		const numberOfLetters =
			1 + Math.floor(Math.random() * lettersThatMayNotBeFullyShared.length);
		for (let i = 0; i < numberOfLetters; i++) {
			const index = Math.floor(
				Math.random() * lettersThatMayNotBeFullyShared.length,
			);
			letters.push(lettersThatMayNotBeFullyShared[index]);
			lettersThatMayNotBeFullyShared.splice(index, 1);
		}
		return letters;
	});

	const indexOfLargestRucksack = Math.floor(Math.random() * numberOfRucksacks);

	const rucksackSizes: number[] = [];

	for (let i = 0; i < numberOfRucksacks; i++) {
		const size =
			i === indexOfLargestRucksack
				? largestRucksackSize
				: Math.floor(Math.random() * largestRucksackSize);
		rucksackSizes.push(size);
	}

	const rucksackContents = uniqueLetters.map((letters, i) => {
		const size = rucksackSizes[i];
		const contents = Array.from({ length: size }).map(() => {
			const index = Math.floor(Math.random() * letters.length);
			return letters[index];
		});
		// replace random letters with the common letter
		for (let i = 0; i < size; i++) {
			if (Math.random() < 0.5 && i !== 0) {
				contents[i] = randomCommonLetter;
			}
		}
		console.log({ randomCommonLetter, uniqueLetters });
		return contents.join("");
	});

	return rucksackContents.join("\n");
}

v.describe("compare implementations for 3 small rucksacks", () => {
	const rucksacks = createRucksacks(3, 10);
	v.bench("discoverUniqueLetterAmongRucksacks", () => {
		discoverUniqueLetterAmongRucksacks(rucksacks.split("\n"));
	});
	v.bench("findBadgeInRucksacks", () => {
		findBadgeInRucksacks(rucksacks.split("\n"));
	});
});

v.describe("compare implementations for 3 massive rucksack", () => {
	const rucksacks = createRucksacks(3, 100000);
	v.bench("discoverUniqueLetterAmongRucksacks", () => {
		discoverUniqueLetterAmongRucksacks(rucksacks.split("\n"));
	});
	v.bench("findBadgeInRucksacks", () => {
		findBadgeInRucksacks(rucksacks.split("\n"));
	});
});

v.describe("compare implementations for many rucksacks", () => {
	const rucksacks = createRucksacks(50, 200);
	v.bench("discoverUniqueLetterAmongRucksacks", () => {
		discoverUniqueLetterAmongRucksacks(rucksacks.split("\n"));
	});
	v.bench("findBadgeInRucksacks", () => {
		findBadgeInRucksacks(rucksacks.split("\n"));
	});
});
