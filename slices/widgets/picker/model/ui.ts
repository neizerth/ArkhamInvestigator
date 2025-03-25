import type { HapticPatternType } from "@features/haptic";
import type { ReactElement } from "react";
import type {
	FlatList,
	FlatListProps,
	ViewProps,
	ViewStyle,
} from "react-native";
import type { ListRenderItemInfo } from "react-native";

export type PickerItemProps = {
	value: number;
};

export type PickerRenderContainer = (info: PickerContainerInfo) => ReactElement;

export type PickerItemInfo = ListRenderItemInfo<number>;

export type PickerContainerInfo = PickerItemInfo & {
	renderItem?: BaseListProps["renderItem"];
	itemHeight?: number;
	itemContainerStyle?: ViewStyle;
	currentValue?: number;
};

export type BaseListProps = FlatListProps<number>;

type ContainerProps = {
	value?: number;
	data: number[];
	itemContainerStyle?: ViewStyle;
	renderItemContainer?: PickerRenderContainer
	visibleItemsCount?: number
	onPress?: () => void | boolean
	onLongPress?: () => void | boolean
	pressPattern?: HapticPatternType
	longPressPattern?: HapticPatternType
	scrollPattern?: HapticPatternType
	delayLongPress?: number;
	gap?: number;
	onValueChanged?: (event: PickerChangeEvent) => void;
	animatedInit?: boolean;
};

export type PickerChangeEvent = {
	value?: number;
	index: number;
};

export type PickerProps = ViewProps &
	ContainerProps & {
		renderItem: BaseListProps["renderItem"];
		itemHeight?: number;
		listStyle?: BaseListProps["style"];
	};

export type PickerListProps = BaseListProps &
	ContainerProps & {
		itemHeight: number;
	};

export type PickerListItemGetItemLayout = Exclude<
	PickerListProps["getItemLayout"],
	undefined
>;
