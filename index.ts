import log from "npmlog";
import { TEST_INPUT as dayOneInput, dayOne } from "./day-1";
import { TEST_INPUT as dayTwoInput, dayTwo } from "./day-2";
import {
  TEST_INPUT as dayThreeInput,
  dayThree,
  dayThreePartTwo,
} from "./day-3";

function main() {
  log.info(`advent-of-code`, `running advent of code`, ``);
  log.info(`day-one`, `result`, `${dayOne(dayOneInput)}`);
  log.info(`day-two`, `result`, `${dayTwo(dayTwoInput)}`);
  log.info(`day-three`, `result:`, `${dayThree(dayThreeInput)}`);
  log.info(`day-three`, `result:`, `${dayThreePartTwo(dayThreeInput)}`);
}

main();
