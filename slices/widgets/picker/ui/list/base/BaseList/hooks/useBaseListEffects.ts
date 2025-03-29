import { pipe } from "ramda";
import { useActivation, useActivationEffects } from "./activation";
import { useScrollEffects } from "./scroll";
import { usePressEvents } from "./usePressEvents";
import { useValueEffects } from "./value";

export const useBaseListEffects = pipe(
	useValueEffects,
	useActivation,
	useActivationEffects,
	useScrollEffects,
	usePressEvents,
);
