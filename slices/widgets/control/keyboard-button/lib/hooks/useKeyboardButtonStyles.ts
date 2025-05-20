import { useWindowDimensions } from "react-native";
import type { KeyboardButtonProps } from "../../model";
import { getKeyboardButtonStyle, getKeyboardButtonTextStyle } from "../styles";

export const useKeyboardButtonStyles = ({ size }: KeyboardButtonProps) => {
	const box = useWindowDimensions();
	const button = getKeyboardButtonStyle({
		box,
		size,
	});
	const text = getKeyboardButtonTextStyle({
		box,
		size,
	});

	return {
		button,
		text,
	};
};
