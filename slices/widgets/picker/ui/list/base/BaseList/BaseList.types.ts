import type {
	PickerActivationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerRenderProps,
} from "@widgets/picker/model";
import type { ViewStyle } from "react-native";

export type BaseListProps = PickerBaseListProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerRenderProps & {
		itemContainerStyle?: ViewStyle;
	};
