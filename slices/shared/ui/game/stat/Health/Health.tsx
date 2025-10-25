import { healthImage as fallbackSource } from "@assets/images/theme/basic";
import { healthImage } from "@assets/images/theme/ffg";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type HealthProps = WithBackgroundComponentProps;

export const Health = withImageBackground({
	source: healthImage,
	fallbackSource,
});
