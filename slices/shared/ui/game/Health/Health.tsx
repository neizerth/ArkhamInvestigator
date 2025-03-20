import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "@shared/lib/hoc/withImageBackground";
const source = require("./images/health.png");

export type HealthProps = WithBackgroundComponentProps;

export const Health = withImageBackground({ source });
