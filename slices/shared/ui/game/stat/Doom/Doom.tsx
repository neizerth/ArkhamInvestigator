import { doomImage } from "@assets/images/game/stats";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type DoomProps = WithBackgroundComponentProps;
export const Doom = withImageBackground({ source: doomImage });
