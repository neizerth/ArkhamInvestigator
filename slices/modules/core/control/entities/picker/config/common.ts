import type { PickerSize } from "../model";

export const MIN_FINGER_SIZE = 48;
export const OVERSCROLL_TRESHOLD = 5;

export const pickerScaleMap: Record<PickerSize, number> = {
	medium: 1,
	small: 0.8,
};
