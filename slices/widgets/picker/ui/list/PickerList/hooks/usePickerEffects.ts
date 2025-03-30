import { pipe } from "ramda";
import { useLongPress } from "./useLongPress";
import { useScrollFeedback } from "./useScrollFeedback";
// import { useValueSet } from "./useValueSet";

export const usePickerEffects = pipe(
	useScrollFeedback,
	useLongPress,
	// useValueSet
);
