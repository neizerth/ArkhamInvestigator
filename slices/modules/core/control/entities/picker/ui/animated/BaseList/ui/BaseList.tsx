import {
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
} from "@modules/core/control/entities/picker/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { isObject, useAppSelector } from "@shared/lib";
import { memo, useCallback, useMemo } from "react";
import type { ListRenderItemInfo } from "react-native";
import { getDataOffsets, getValueIndex } from "../../../../lib";
import useBaseListHooks from "../lib";
import type { BaseListItemValue, BaseListProps } from "../model/common";
import * as C from "./BaseList.components";

export function BaseList<T>(baseProps: BaseListProps<T>) {
	const props = useBaseListHooks(baseProps);
	const {
		itemHeight,
		data = [],
		value,
		renderItem,
		renderItemContainer,
		itemContainerStyle,
	} = props;
	const index = getValueIndex(baseProps);

	const renderListItem = useCallback(
		(info: ListRenderItemInfo<T>) => {
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
		(_: BaseListItemValue<T>, index: number) => ({
			length: itemHeight,
			offset: itemHeight * index,
			index: index,
		}),
		[itemHeight],
	);

	const decelerationRate = useAppSelector(
		(state) => selectPickerDecelerationType(state) || 0,
	);
	const disableIntervalMomentum = useAppSelector(
		(state) => !selectPickerIntervalMomentum(state),
	);

	const keyExtractor = (item: T, index: number) => {
		if (isObject(item)) {
			return index.toString();
		}
		return String(item);
	};

	return (
		<C.List
			decelerationRate={decelerationRate}
			disableIntervalMomentum={disableIntervalMomentum}
			{...props}
			initialScrollIndex={index}
			getItemLayout={getItemLayout}
			style={[props.style, style]}
			data={data}
			renderItem={renderListItem}
			keyExtractor={keyExtractor}
			snapToOffsets={snapToOffsets}
			showsVerticalScrollIndicator={false}
			scrollsToTop={false}
			removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
		/>
	);
}

export const BaseListMemo = memo(BaseList);
