import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerRenderProps,
} from "@widgets/picker/model";
import type { ViewStyle } from "react-native";

export type BaseListProps = PickerBaseListProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerRenderProps & {
		itemContainerStyle?: ViewStyle;
	};
