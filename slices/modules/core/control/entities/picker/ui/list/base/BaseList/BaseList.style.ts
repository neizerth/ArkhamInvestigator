import type { ViewStyle } from "react-native";

export type GetPickerListStyleOptions = {
	pickerHeight: number;
	itemHeight: number;
	isListActive: boolean;
};

type OptionalViewStyle = ViewStyle | boolean;

export const getBaseListStyle = ({
	pickerHeight,
	itemHeight,
	isListActive,
}: GetPickerListStyleOptions) => {
	const paddingVertical = (pickerHeight - itemHeight) / 2;

	const contentContainerStyle: OptionalViewStyle = {
		paddingVertical,
	};

	const containerStyle: OptionalViewStyle = !isListActive && {
		height: itemHeight,
	};

	const contentStyle: OptionalViewStyle = !isListActive && {
		top: -paddingVertical,
	};

	const list: OptionalViewStyle = {
		height: pickerHeight,
	};

	return {
		containerStyle,
		contentContainerStyle,
		contentStyle,
		list,
	};
};
