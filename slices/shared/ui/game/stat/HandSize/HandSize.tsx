import { handSizeImage } from "@assets/images/theme";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type HandSizeProps = WithBackgroundComponentProps;
export const HandSize = withImageBackground({ source: handSizeImage });
