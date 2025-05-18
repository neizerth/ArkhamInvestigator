import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { useCallback, useRef } from "react";
import type { ListRenderItemInfo } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
import * as C from "./ChaosTokenList.components";
import type {
	ChaosTokenListItem,
	ChaosTokenListProps,
} from "./ChaosTokenList.types";
import { chaosTokenListData } from "./data";

const ITEM_HEIGHT = 58;

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

	const getItemLayout = useCallback((_: unknown, index: number) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index: index,
		};
	}, []);

	return (
		<C.Container
			{...props}
			ref={ref}
			data={chaosTokenListData}
			renderItem={renderItem}
			onStartReached={scrollToTop}
			getItemLayout={getItemLayout}
			removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
		/>
	);
};
