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

export type PickerListProps<T> = PickerBaseListProps<T> &
	PickerScrollProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerPressProps &
	PickerGestureProps &
	PickerRenderProps<T> &
	PickerHapticScrollProps;
