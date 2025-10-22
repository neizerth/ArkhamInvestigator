import { healthImage } from "@assets/images/theme";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type HealthProps = WithBackgroundComponentProps;

export const Health = withImageBackground({ source: healthImage });
