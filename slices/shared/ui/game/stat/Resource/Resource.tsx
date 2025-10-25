import { resourceImage as fallbackSource } from "@assets/images/theme/basic";
import { resourceImage } from "@assets/images/theme/ffg";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type ResourceProps = WithBackgroundComponentProps;
export const Resource = withImageBackground({
	source: resourceImage,
	fallbackSource,
});
