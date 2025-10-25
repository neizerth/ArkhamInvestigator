import { sanityImage as fallbackSource } from "@assets/images/theme/basic";
import { sanityImage } from "@assets/images/theme/ffg";
import type { ImageBackgroundProps } from "react-native";
import { withImageBackground } from "../../../../lib/hoc";

export type SanityProps = ImageBackgroundProps;
export const Sanity = withImageBackground({
	source: sanityImage,
	fallbackSource,
});
