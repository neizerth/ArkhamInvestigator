import type { ImageBackgroundProps } from "@shared/ui";
import * as C from "./RulesBackground.components";

export type RulesBackgroundProps = ImageBackgroundProps;

export const RulesBackground = (props: RulesBackgroundProps) => {
	return <C.Container {...props} />;
};
