import type { ViewProps } from "react-native";
import type { ChaosTokenType } from "../../../model";

export type ChaosTokenProps = ViewProps & {
	type: ChaosTokenType;
	size?: number;
};

export const ChaosToken = (props: ChaosTokenProps) => {
	return <></>;
};
