import { healthImage } from "@assets/images/game/stats";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type HealthProps = WithBackgroundComponentProps;

export const Health = withImageBackground({ source: healthImage });
