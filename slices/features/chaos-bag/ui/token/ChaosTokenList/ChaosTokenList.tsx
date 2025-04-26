import { useCallback, useRef } from "react";
import type { ListRenderItemInfo } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
import * as C from "./ChaosTokenList.components";
import type {
	ChaosTokenListItem,
	ChaosTokenListProps,
} from "./ChaosTokenList.types";
import { chaosTokenListData } from "./data";

export const ChaosTokenList = ({ ...props }: ChaosTokenListProps) => {
	const ref = useRef<FlatList>(null);
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<ChaosTokenListItem>) => {
			const { type } = item;

			if (type === "blessCurse") {
				return <C.BlessCurse />;
			}

			return <C.Item type={item.value} preview />;
		},
		[],
	);

	const scrollToTop = useCallback(() => {
		ref.current?.scrollToIndex({
			index: 0,
		});
	}, []);

	return (
		<C.Container
			{...props}
			ref={ref}
			data={chaosTokenListData}
			renderItem={renderItem}
			onStartReached={scrollToTop}
		/>
	);
};
