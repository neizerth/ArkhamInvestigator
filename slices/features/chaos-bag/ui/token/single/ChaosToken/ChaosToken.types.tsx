import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import type { ChaosTokenType } from "../../../../model";

export type ChaosTokenProps = ViewProps & ChaosTokenConfig;

export type ChaosTokenConfig = {
	type: ChaosTokenType;
	size?: number;
	selected?: boolean;
};
