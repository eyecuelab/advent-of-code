import log from "npmlog";
import { TEST_INPUT as dayOneInput, dayOne } from "./day-one";
import { TEST_INPUT as dayTwoInput, dayTwo } from "./day-two";

function main() {
  log.info(`running advent of code`, ``);
  log.info(`day one result`, dayOne(dayOneInput));
  log.info(`day two result`, dayTwo(dayTwoInput));
}

main();
