import type { ViewProps } from "react-native";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenDetails.components";

export type ChaosTokenDetailsProps = ViewProps & {
	type: ChaosTokenType;
	count?: number;
};

export const ChaosTokenDetails = ({ type }: ChaosTokenDetailsProps) => {
	return (
		<C.Container>
			<C.Content>
				<C.Item type={type} />
			</C.Content>
		</C.Container>
	);
};
