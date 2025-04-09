import type { ImageBackgroundProps } from "react-native";
import { withImageBackground } from "../../../../lib/hoc";

const source = require("./images/sanity.png");

export type SanityProps = ImageBackgroundProps;
export const Sanity = withImageBackground({ source });
