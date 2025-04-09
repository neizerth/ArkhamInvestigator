import {
	type WithBackgroundComponentProps,
	withImageBackground,
} from "../../../../lib/hoc";

const source = require("./images/resource.png");

export type ResourceProps = WithBackgroundComponentProps;
export const Resource = withImageBackground({ source });
