import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { selectAvailableTokenCountByType } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { selectChaosTokenCountByType } from "../../lib";
import * as C from "./ChaosTokenCount.components";

export type ChaosTokenCountProps = ViewProps & {
	type: ChaosTokenType;
	available?: boolean;
};

export const ChaosTokenCount = ({
	type,
	available = false,
	...props
}: ChaosTokenCountProps) => {
	const selectorCreator = available
		? selectAvailableTokenCountByType
		: selectChaosTokenCountByType;
	const selector = selectorCreator(type);

	const value = useAppSelector(selector);
	return (
		<C.Container {...props}>
			<C.Counter value={value} />
			<C.Token type={type} />
		</C.Container>
	);
};
