import { doomImage } from "@assets/images/theme";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type DoomProps = WithBackgroundComponentProps;
export const Doom = withImageBackground({ source: doomImage });
