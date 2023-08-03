/**
 * eg
```
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```
 */
type ElfCaloriesInput = string;
export const TEST_INPUT: ElfCaloriesInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

export function sum(a, b): number {
  return a + b;
}

export function desc(a, b): number {
  return b - a;
}
export function dayOne(stringElfCalories: ElfCaloriesInput): number {
  /**
   * parse the input
   * - split on newlines
   * - empty lines are going to represent the beginning of a new elf
   *   so we need to group each of those into a separate array for each elf
   * - sum each of those number arrays and return the three largest entries?
   */
  console.log(`received elf input: ${stringElfCalories}`);

  const result = stringElfCalories
    .split("\n\n")
    .map((stringOfNumbers) =>
      stringOfNumbers.split("\n").map(Number).reduce(sum, 0)
    )
    .sort(desc)
    .slice(0, 3)
    .reduce(sum, 0);
  console.log(result);
  return result;
}
