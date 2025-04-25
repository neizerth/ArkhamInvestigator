import type { ViewProps } from "react-native";
import type { ChaosTokenType } from "../../../model";

export type ChaosTokenDetailsProps = ViewProps & {
	type: ChaosTokenType;
	count?: number;
};

export const ChaosTokenDetails = (props: ChaosTokenDetailsProps) => {
	return <></>;
};
