import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerRenderProps,
	PickerScrollProps,
} from "@widgets/control/picker/model";
import type { RefObject } from "react";
import type { FlatList, ViewStyle } from "react-native";

export type BaseListProps = PickerBaseListProps &
	PickerScrollProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerRenderProps & {
		itemContainerStyle?: ViewStyle;
		ref?: RefObject<FlatList<number>>;
	};
