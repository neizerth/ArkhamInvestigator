import type { ViewProps } from "react-native";

import * as C from "./InvestigatorImageEffects.components";
import { useInvestigatorImageStyle } from "./useInvestigatorImageStyle";
export type InvestigatorImageEffectsProps = ViewProps;

export const InvestigatorImageEffects = (
	props: InvestigatorImageEffectsProps,
) => {
	const style = useInvestigatorImageStyle();
	return <C.Container {...props} style={style} />;
};
