import log from "npmlog";
import { TEST_INPUT as dayOneInput, dayOne } from "./day-one";
import { TEST_INPUT as dayTwoInput, dayTwo } from "./day-two";
import { TEST_INPUT as dayThreeInput, dayThree } from "./day-three";

function main() {
  log.info(`advent-of-code`, `running advent of code`, ``);
  log.info(`day-one`, `result`, `${dayOne(dayOneInput)}`);
  log.info(`day-two`, `result`, `${dayTwo(dayTwoInput)}`);
  log.info(`day-three`, `result:`, `${dayThree(dayThreeInput)}`);
}

main();
