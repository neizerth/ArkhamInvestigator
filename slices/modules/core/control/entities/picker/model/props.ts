import type { HapticPatternType } from "@modules/core/haptic/shared/model";
import type { MaybePromise, PickPartial } from "@shared/model";
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

export type PickerRenderProp<T> = (
	info: PickerContainerInfo<T>,
) => ReactElement;

export type PickerListRenderItem<T> = ListRenderItem<T>;

export type PickerItemInfo<T> = ListRenderItemInfo<T>;

export type PickerContainerInfo<T> = PickerItemInfo<T> & {
	renderItem?: PickerListRenderItem<T>;
	itemHeight?: number;
	itemContainerStyle?: ViewStyle;
	currentValue?: T;
};

type ListProps<T> = Omit<
	FlatListPropsWithLayout<T>,
	"data" | "renderItem" | "contentContainerStyle" | "style"
> & {
	style?: ViewProps["style"];
};

export type PickerBaseListProps<T> = ListProps<T> &
	PickerDataProps<T> & {
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
	onPressIn?: () => void;
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

export type PickerDataProps<T = number> = {
	data: T[];
	value?: T;
	onValueChanged?: (event: PickerChangeEvent<T>) => void;
	onValueChanging?: (event: PickerChangeEvent<T>) => void | false;
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
	listStyle?: ViewProps["style"];
};

export type PickerItemStyleProps = {
	itemHeight?: number;
	gap?: number;
};

export type PickerRenderProps<T> = {
	renderItemContainer: PickerRenderProp<T>;
	renderItem: PickerListRenderItem<T>;
};

export type PickerAnimationProps = {
	animated?: boolean;
	displayType?: "static" | "animated";
};

export type PickerProps<T> = ListProps<T> &
	PickerAnimationProps &
	PickerStyleProps &
	PickerItemStyleProps &
	PickerBasePressProps &
	PickerGestureProps &
	PickerActivationProps &
	PickPartial<PickerRenderProps<T>, "renderItemContainer"> &
	PickerPressProps &
	PickerHapticScrollProps &
	PickerDataProps<T>;
