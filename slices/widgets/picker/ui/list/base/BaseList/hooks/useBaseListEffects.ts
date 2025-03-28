import { pipe } from "ramda";
import { useScrollEnd } from "./useScrollEnd";
import { useUserActivation } from "./useUserActivation";
import { useValueEffects } from "./value";

export const useBaseListEffects = pipe(
	useValueEffects,
	useUserActivation,
	useScrollEnd,
);
