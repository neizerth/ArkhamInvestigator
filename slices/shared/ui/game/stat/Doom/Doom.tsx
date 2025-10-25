import { doomImage as fallbackSource } from "@assets/images/theme/basic";
import { doomImage } from "@assets/images/theme/ffg";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type DoomProps = WithBackgroundComponentProps;
export const Doom = withImageBackground({ source: doomImage, fallbackSource });
