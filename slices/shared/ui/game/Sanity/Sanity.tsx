import { withImageBackground } from "@shared/lib/hoc";
import type { ImageBackgroundProps } from "react-native";

const source = require("./images/sanity.png");

export type SanityProps = ImageBackgroundProps;
export const Sanity = withImageBackground({ source });
