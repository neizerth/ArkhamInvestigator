import { actionImage } from "@assets/images/theme";
import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

export type ActionProps = WithBackgroundComponentProps;

export const Action = withImageBackground({ source: actionImage });
