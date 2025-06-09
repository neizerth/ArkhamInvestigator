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

export type BaseListProps = PickerBaseListProps &
	PickerScrollProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerRenderProps & {
		itemContainerStyle?: ViewStyle;
		ref?: RefObject<FlatList<number> | null>;
	};
