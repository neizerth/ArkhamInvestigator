import { pipe } from "ramda";
import { useLongPress } from "./useLongPress";
import { useScrollFeedback } from "./useScrollFeedback";

export default pipe(useScrollFeedback, useLongPress);
