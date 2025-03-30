import type { HapticPatternType } from "@features/haptic";
import type { ReactElement } from "react";
import type {
	GestureResponderEvent,
	ListRenderItem,
	ViewProps,
	ViewStyle,
} from "react-native";
import type { ListRenderItemInfo } from "react-native";
import type { FlatListPropsWithLayout } from "react-native-reanimated";
import type { PickerChangeEvent } from "./events";

export type PickerRenderProp = (info: PickerContainerInfo) => ReactElement;

export type PickerListRenderItem = ListRenderItem<number>;

export type PickerItemInfo = ListRenderItemInfo<number>;

export type PickerContainerInfo = PickerItemInfo & {
	renderItem?: PickerListRenderItem;
	itemHeight?: number;
	itemContainerStyle?: ViewStyle;
	currentValue?: number;
};

type ListProps = Omit<FlatListPropsWithLayout<number>, "data">;

export type PickerBaseListProps = Omit<ListProps, "renderItem"> &
	PickerDataProps & {
		onScrollEnd?: () => void;
		onLastScroll?: () => void;
		itemHeight: number;
	};

export type PickerBasePressProps = {
	onPressIn?: (e: GestureResponderEvent) => void;
	onPressOut?: () => void;
};

export type PickerActivationProps = {
	controlEnabled?: boolean;
	onScrollDeactivated?: () => void;

	onActivated?: () => void;
	onDeactivated?: () => void;

	onUserActivated?: (e: GestureResponderEvent) => void;
	onUserDeactivated?: () => void;
	onUserActivationChange?: (activated: boolean) => void;
};

export type PickerDataProps = {
	data: number[];
	value?: number;
	onValueChanged?: (event: PickerChangeEvent) => void;
	onValueChanging?: (event: PickerChangeEvent) => void | boolean;
};

export type PickerScrollProps = {
	scrollHapticPattern?: HapticPatternType;
};

export type PickerPressProps = {
	onPress?: () => void | boolean;
	onLongPress?: () => void | boolean;
	onDoublePress?: () => void | boolean;
	pressMaxDuration?: number;
	longPressMinDuration?: number;
	doublePressMaxDuration?: number;

	pressHapticPattern?: HapticPatternType;
	doublePressHapticPattern?: HapticPatternType;
	longPressHapticPattern?: HapticPatternType;
};

export type PickerStyleProps = {
	itemContainerStyle?: ViewStyle;
	listStyle?: ListProps["style"];
};

export type PickerItemStyleProps = {
	itemHeight?: number;
	gap?: number;
};

export type PickerRenderProps = {
	renderItemContainer?: PickerRenderProp;
	renderItem: PickerListRenderItem;
};

export type PickerAnimationProps = {
	animated?: boolean;
};

export type PickerProps = ViewProps &
	PickerAnimationProps &
	PickerStyleProps &
	PickerItemStyleProps &
	PickerBasePressProps &
	PickerActivationProps &
	PickerRenderProps &
	PickerPressProps &
	PickerScrollProps &
	PickerDataProps;
