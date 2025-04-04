import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerHapticScrollProps,
	PickerPressProps,
	PickerRenderProps,
	PickerScrollProps,
} from "@widgets/control/picker/model";

export type PickerListProps = PickerBaseListProps &
	PickerScrollProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerPressProps &
	PickerRenderProps &
	PickerHapticScrollProps;
