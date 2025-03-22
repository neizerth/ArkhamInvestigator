import { impactHapticFeedback, tickFeedback } from "@features/haptic";
import { safeIndexOf } from "@shared/lib";
import { useBooleanRef } from "@shared/lib/hooks";
import { MIN_FINGER_SIZE } from "@widgets/picker/config";
import type { PickerListProps } from "@widgets/picker/model";
import { times } from "ramda";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import type {
	FlatList,
	ListRenderItemInfo,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
} from "react-native";
import * as C from "./PickerList.components";
import { defaultRenderItemContainer } from "./defaultRenderItemContainer";

type ListScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export const PickerList = ({
	itemContainerStyle,
	data = [],
	value,
	renderItem,
	renderItemContainer = defaultRenderItemContainer,
	visibleItemsCount = 3,
	delayLongPress = 500,
	onValueChanged,
	onLongPress,
	onPress,
	gap = 0,
	pressPattern = "effectTick",
	longPressPattern = "effectTick",
	animatedInit = true,
	...props
}: PickerListProps) => {
	const activated = useRef(false);
	const touching = useRef(false);
	const canPress = useRef(false);
	const uiSync = useRef(false);

	const longPressTimeout = useRef<NodeJS.Timeout>();

	const index = useRef(0);
	const listRef = useRef<FlatList>(null);

	const itemHeight = props.itemHeight + gap;

	useEffect(() => {
		touching.current = false;
		activated.current = false;
		canPress.current = false;
		uiSync.current = false;
	}, []);

	const renderListItem = useCallback(
		(info: ListRenderItemInfo<number>) => {
			return renderItemContainer({
				...info,
				itemHeight,
				renderItem,
				currentValue: value,
			});
		},
		[itemHeight, renderItemContainer, renderItem, value],
	);

	const defaultIndex = Math.max(safeIndexOf(value, data), 0);

	useEffect(() => {
		if (!listRef.current) {
			return;
		}
		if (index.current === defaultIndex) {
			return;
		}
		if (data.length === 0) {
			return;
		}
		uiSync.current = true;

		listRef.current?.scrollToIndex({
			index: defaultIndex,
			animated: animatedInit,
		});
	}, [defaultIndex, animatedInit, data]);

	const snapToOffsets = useMemo(
		() => data.map((_, i) => i * itemHeight),
		[data, itemHeight],
	);

	const onScrollEnd = useCallback(() => {
		const nextValue = data[index.current];
		activated.current = touching.current;

		if (uiSync.current) {
			uiSync.current = false;
			return;
		}

		if (value === nextValue) {
			return;
		}
		onValueChanged?.({
			value: nextValue,
			index: index.current,
		});
	}, [data, onValueChanged, value]);

	const onTouchMove = useCallback(() => {
		canPress.current = false;
	}, []);

	const onScroll = useCallback(
		(e: ListScrollEvent) => {
			if (longPressTimeout.current) {
				clearTimeout(longPressTimeout.current);
			}
			const offset = e.nativeEvent.contentOffset.y;
			const scrollIndex = Math.round(offset / itemHeight);

			const n = Math.abs(index.current - scrollIndex);

			index.current = scrollIndex;

			if (!activated.current) {
				return;
			}

			times(() => {
				impactHapticFeedback(pressPattern);
			}, n);
		},
		[itemHeight, pressPattern],
	);

	const onTouchStart = useCallback(() => {
		touching.current = true;
		activated.current = true;
		canPress.current = true;
		uiSync.current = false;

		if (!onLongPress) {
			return;
		}
		longPressTimeout.current = setTimeout(() => {
			if (!canPress.current) {
				return;
			}

			canPress.current = false;
			activated.current = false;

			if (onLongPress() !== false) {
				impactHapticFeedback(longPressPattern);
			}
		}, delayLongPress);
	}, [onLongPress, delayLongPress, longPressPattern]);

	const onTouchEnd = useCallback(() => {
		activated.current = false;
		touching.current = false;
		clearTimeout(longPressTimeout.current);
		if (canPress.current && onPress) {
			if (onPress() !== false) {
				impactHapticFeedback(pressPattern);
			}

			canPress.current = false;

			return;
		}

		if (!longPressTimeout.current) {
			return;
		}
		clearTimeout(longPressTimeout.current);
	}, [onPress, pressPattern]);

	const getItemLayout = useCallback(
		(_, index: number) => ({
			length: itemHeight,
			offset: itemHeight * index,
			index: index,
		}),
		[itemHeight],
	);

	const style = {
		height: itemHeight,
	};

	return (
		<C.List
			data={data}
			ref={listRef}
			renderItem={renderListItem}
			style={[props.style, style]}
			contentContainerStyle={[props.contentContainerStyle]}
			keyExtractor={(item) => item.toString()}
			getItemLayout={getItemLayout}
			initialScrollIndex={defaultIndex}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
			onMomentumScrollEnd={onScrollEnd}
			onScroll={onScroll}
			snapToOffsets={snapToOffsets}
			showsVerticalScrollIndicator={false}
			removeClippedSubviews
		/>
	);
};

export const PickerListMemo = memo(PickerList);
