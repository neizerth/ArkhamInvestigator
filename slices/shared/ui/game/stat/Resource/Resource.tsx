import { resourceImage } from "@assets/images/game/stats";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type ResourceProps = WithBackgroundComponentProps;
export const Resource = withImageBackground({ source: resourceImage });
