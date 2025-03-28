import { pipe } from "ramda";
import { useActivation, useActivationEffects } from "./activation";
import { usePressEvents } from "./usePressEvents";
import { useScrollEnd } from "./useScrollEnd";
import { useValueEffects } from "./value";

export const useBaseListEffects = pipe(
	useValueEffects,
	useActivation,
	useActivationEffects,
	useScrollEnd,
	usePressEvents,
);
