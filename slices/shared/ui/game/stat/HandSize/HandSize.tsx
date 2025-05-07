import { handSizeImage } from "@assets/images/game/stats";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type HandSizeProps = WithBackgroundComponentProps;
export const HandSize = withImageBackground({ source: handSizeImage });
