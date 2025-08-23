import { pipe } from "ramda";
import useActivationEffects from "./activation";
import useScrollEffects from "./scroll";
import { usePressEvents } from "./usePressEvents";
import useValueEffects from "./value";

export default pipe(
	useValueEffects,
	useScrollEffects,
	useActivationEffects,
	usePressEvents,
);
