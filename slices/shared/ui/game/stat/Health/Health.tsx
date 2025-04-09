import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

const source = require("./images/health.png");

export type HealthProps = WithBackgroundComponentProps;

export const Health = withImageBackground({ source });
