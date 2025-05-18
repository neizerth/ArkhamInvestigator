import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerGestureProps,
	PickerHapticScrollProps,
	PickerPressProps,
	PickerRenderProps,
	PickerScrollProps,
} from "../../../model";

export type PickerListProps = PickerBaseListProps &
	PickerScrollProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerPressProps &
	PickerGestureProps &
	PickerRenderProps &
	PickerHapticScrollProps;
