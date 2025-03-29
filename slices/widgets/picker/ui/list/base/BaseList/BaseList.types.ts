import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerRenderProps,
} from "@widgets/picker/model";
import type { RefObject } from "react";
import type { FlatList, ViewStyle } from "react-native";

export type BaseListProps = PickerBaseListProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerRenderProps & {
		itemContainerStyle?: ViewStyle;
		ref?: RefObject<FlatList<number>>;
	};
