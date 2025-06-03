import type { HapticPatternType } from "@features/haptic";
import type { ReactElement } from "react";
import type {
	GestureResponderEvent,
	ListRenderItem,
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

type BaseListProps = FlatListPropsWithLayout<number>;

type ListProps = Omit<
	FlatListPropsWithLayout<number>,
	"data" | "renderItem" | "contentContainerStyle"
>;

export type PickerBaseListProps = ListProps &
	PickerDataProps & {
		itemHeight: number;
	};

export type PickerScrollProps = {
	onScrollEnd?: () => void;
	onLastScroll?: () => void;

	overScrollTreshold?: number;
	onOverScrollStart?: () => void;
	onOverScrollEnd?: () => void;
};

export type PickerBasePressProps = {
	onPressIn?: (e: GestureResponderEvent) => void;
	onPressOut?: () => void;
	onPressChange?: (value: boolean) => void;
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

	sound?: boolean;
};

export type PickerHapticScrollProps = {
	scrollHapticPattern?: HapticPatternType;
};

export type PickerPressProps = {
	onPress?: () => void | unknown;
	onLongPress?: () => void | unknown;
	onDoublePress?: () => void | unknown;
	pressMaxDuration?: number;
	longPressMinDuration?: number;
	doublePressMaxDuration?: number;

	pressHapticPattern?: HapticPatternType;
	doublePressHapticPattern?: HapticPatternType;
	longPressHapticPattern?: HapticPatternType;
};

export type PickerGestureProps = {
	onSwipeRight?: () => void | boolean;
	onSwipeLeft?: () => void | boolean;

	swipeRightHapticPattern?: HapticPatternType;
	swipeLeftHapticPattern?: HapticPatternType;
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

export type PickerProps = ListProps &
	PickerAnimationProps &
	PickerStyleProps &
	PickerItemStyleProps &
	PickerBasePressProps &
	PickerGestureProps &
	PickerActivationProps &
	PickerRenderProps &
	PickerPressProps &
	PickerHapticScrollProps &
	PickerDataProps;
