import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export type PickerScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export type PickerChangeEvent = {
	value?: number;
	index: number;
};
