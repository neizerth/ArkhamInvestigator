import { useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";
import type { FlatListProps } from "react-native";
import { chaosToken } from "../../../config";
import type { ChaosTokenType, ChaosTokensCount } from "../../../model";
import * as C from "./ChaosTokenList.components";

export type ChaosTokenListProps = Omit<
	FlatListProps<ChaosTokenType>,
	"data" | "renderItem"
> & {
	data?: ChaosTokensCount;
};

export const ChaosTokenList = ({ data, ...props }: ChaosTokenListProps) => {
	const renderItem = useCallback(
		(info: ListRenderItemInfo<ChaosTokenType>) => {
			const type = info.item;
			const count = data?.[type];
			return <C.Item type={type} count={count} />;
		},
		[data],
	);

	return (
		<C.Container
			{...props}
			data={chaosToken.types.regular}
			renderItem={renderItem}
		/>
	);
};
