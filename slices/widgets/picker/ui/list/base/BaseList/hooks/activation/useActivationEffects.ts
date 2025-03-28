import { pipe } from "ramda";
import { useActivation } from "./useActivation";
import { useScrollActivation } from "./useScrollActivation";
import { useUserActivation } from "./useUserActivation";

export const useActivationEffects = pipe(
	useScrollActivation,
	useActivation,
	useUserActivation,
);
