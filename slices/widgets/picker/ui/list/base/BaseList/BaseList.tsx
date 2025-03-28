import { getDataOffsets, getValueIndex } from "@widgets/picker/lib";
import { memo, useCallback, useMemo } from "react";
import type { ListRenderItemInfo } from "react-native";
import * as C from "./BaseList.components";
import type { BaseListProps } from "./BaseList.types";
import { defaultRenderItemContainer } from "./defaultRenderItemContainer";
import { useBaseListEffects } from "./hooks";
export const BaseList = (baseProps: BaseListProps) => {
	const props = useBaseListEffects(baseProps);
	const {
		itemHeight,
		data = [],
		value,
		renderItem,
		renderItemContainer = defaultRenderItemContainer,
		itemContainerStyle,
	} = props;
	const index = getValueIndex(baseProps);

	const renderListItem = useCallback(
		(info: ListRenderItemInfo<number>) => {
			return renderItemContainer({
				...info,
				itemContainerStyle,
				itemHeight,
				renderItem,
				currentValue: value,
			});
		},
		[itemHeight, renderItemContainer, renderItem, value, itemContainerStyle],
	);

	const style = {
		height: itemHeight,
	};

	const size = data.length;

	const snapToOffsets = useMemo(
		() => getDataOffsets(size, itemHeight),
		[size, itemHeight],
	);

	const getItemLayout = useCallback(
		(_: unknown, index: number) => ({
			length: itemHeight,
			offset: itemHeight * index,
			index: index,
		}),
		[itemHeight],
	);

	return (
		<C.List
			{...props}
			initialScrollIndex={index}
			getItemLayout={getItemLayout}
			style={[props.style, style]}
			data={data}
			renderItem={renderListItem}
			keyExtractor={(item) => item.toString()}
			snapToOffsets={snapToOffsets}
			showsVerticalScrollIndicator={false}
			decelerationRate={0}
			disableIntervalMomentum
			removeClippedSubviews
		/>
	);
};

export const BaseListMemo = memo(BaseList);
