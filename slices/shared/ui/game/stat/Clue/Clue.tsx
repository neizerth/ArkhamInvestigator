import { clueImage as fallbackSource } from "@assets/images/theme/basic";
import { clueImage } from "@assets/images/theme/ffg";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type ClueProps = WithBackgroundComponentProps;
export const Clue = withImageBackground({
	source: clueImage,
	fallbackSource,
});
