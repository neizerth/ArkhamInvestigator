import { sanityImage } from "@assets/images/theme";
import type { ImageBackgroundProps } from "react-native";
import { withImageBackground } from "../../../../lib/hoc";

export type SanityProps = ImageBackgroundProps;
export const Sanity = withImageBackground({ source: sanityImage });
