import type { HapticPatternType } from "@modules/core/haptic/shared/model";
import type { MaybePromise } from "@shared/model";
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
	onValueChanging?: (event: PickerChangeEvent) => void | false;
};

export type PickerHapticScrollProps = {
	scrollHapticPattern?: HapticPatternType;
};

export type PickerPressCallback = () => MaybePromise<void | false>;

export type PickerPressProps = {
	onPress?: PickerPressCallback;
	onLongPress?: PickerPressCallback;
	onDoublePress?: PickerPressCallback;
	pressMaxDuration?: number;
	longPressMinDuration?: number;
	doublePressMaxDuration?: number;
};

export type PickerGestureProps = {
	onSwipeRight?: () => void | false;
	onSwipeLeft?: () => void | false;
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
