import * as v from "vitest";

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
		const numberOfLetters = Math.floor(
			Math.random() * lettersThatMayNotBeFullyShared.length,
		);
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
		console.log({ randomCommonLetter, lettersThatMayNotBeFullyShared });
		return contents.join("");
	});

	return rucksackContents.join("\n");
}

v.describe("comparing String.split to JSON.parse", () => {
	console.log(createRucksacks(100, 1000));
	const str = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y";
	v.bench("String.split", () => {
		str.split(",");
	});
	v.bench("JSON.parse", () => {
		JSON.parse("[`${str}`]");
	});
});

const elements = "1,".repeat(10000).slice(0, -1);

v.describe("10000 elements", () => {
	v.bench("String.split", () => {
		elements.split(",");
	});
	v.bench("JSON.parse", () => {
		JSON.parse("[`${elements}`]");
	});
});

v.describe("comparing Array.join to JSON.stringify", () => {
	const arr = Array.from({ length: 10000 }, (_, i) => i);
	v.bench("join", () => {
		arr.join(",");
	});
	v.bench("JSON.stringify", () => {
		JSON.stringify(arr);
	});
});
