import { useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";
import * as C from "./ChaosTokenList.components";
import type {
	ChaosTokenListItem,
	ChaosTokenListProps,
} from "./ChaosTokenList.types";
import { chaosTokenListData } from "./data";

export const ChaosTokenList = ({ data, ...props }: ChaosTokenListProps) => {
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<ChaosTokenListItem>) => {
			const { type } = item;

			if (type === "blessCurse") {
				return (
					<C.BlessCurse>
						<C.Token type="bless" count={data?.bless} />
						<C.Token type="curse" count={data?.curse} />
					</C.BlessCurse>
				);
			}

			const count = data?.[item.value];

			return <C.Item type={item.value} count={count} preview />;
		},
		[data],
	);

	return (
		<C.Container {...props} data={chaosTokenListData} renderItem={renderItem} />
	);
};
