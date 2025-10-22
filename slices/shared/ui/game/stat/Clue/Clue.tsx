import { clueImage } from "@assets/images/theme";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type ClueProps = WithBackgroundComponentProps;
export const Clue = withImageBackground({ source: clueImage });
