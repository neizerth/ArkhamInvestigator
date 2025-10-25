import { handSizeImage as fallbackSource } from "@assets/images/theme/basic";
import { handSizeImage } from "@assets/images/theme/ffg";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type HandSizeProps = WithBackgroundComponentProps;
export const HandSize = withImageBackground({
	source: handSizeImage,
	fallbackSource,
});
