import type { RefObject } from "react";
import type { FlatList, ViewStyle } from "react-native";
import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerRenderProps,
	PickerScrollProps,
} from "../../../../model";

export type BaseListProps<T> = PickerBaseListProps<T> &
	PickerScrollProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerRenderProps<T> & {
		itemContainerStyle?: ViewStyle;
		ref?: RefObject<FlatList<T> | null>;
	};

export type BaseListItemValue<T> = ArrayLike<T> | null | undefined;
