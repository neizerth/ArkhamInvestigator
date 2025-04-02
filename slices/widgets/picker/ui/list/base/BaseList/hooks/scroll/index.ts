import { pipe } from "ramda";
import useScrollCorrection from "./correction";
import { useOverScroll } from "./useOverScroll";
import { useScrollActivation } from "./useScrollActivation";
import { useScrollEnd } from "./useScrollEnd";

export default pipe(
	useScrollActivation,
	useScrollEnd,
	useScrollCorrection,
	useOverScroll,
);
