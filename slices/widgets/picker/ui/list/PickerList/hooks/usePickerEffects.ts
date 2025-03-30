import { pipe } from "ramda";
import { useLongPress } from "./useLongPress";
import { useScrollFeedback } from "./useScrollFeedback";

export const usePickerEffects = pipe(useScrollFeedback, useLongPress);
