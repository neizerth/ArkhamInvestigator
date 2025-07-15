import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { selectChaosTokenCountByType } from "../../lib";
import * as C from "./ChaosTokenCount.components";

export type ChaosTokenCountProps = ViewProps & {
	type: ChaosTokenType;
};

export const ChaosTokenCount = ({ type, ...props }: ChaosTokenCountProps) => {
	const value = useAppSelector(selectChaosTokenCountByType(type));
	return (
		<C.Container {...props}>
			<C.Counter value={value} />
			<C.Token type={type} />
		</C.Container>
	);
};
