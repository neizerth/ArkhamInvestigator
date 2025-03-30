import { pipe } from "ramda";
import { useOverScroll } from "./useOverScroll";
import { useScrollBack } from "./useScrollBack";
import { useScrollEnd } from "./useScrollEnd";

export const useScrollEffects = pipe(
	useScrollEnd,
	useScrollBack,
	useOverScroll,
);
