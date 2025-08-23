import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export type PickerScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export type PickerChangeEvent<T = number> = {
	value?: T;
	index: number;
};

export type PickerStartReachedEvent = {
	distanceFromStart: number;
};

export type PickerEndReachedEvent = {
	distanceFromEnd: number;
};
