import { useWindowDimensions } from "react-native";
import type { KeyboardButtonSize } from "../../model";
import { getKeyboardButtonStyle, getKeyboardButtonTextStyle } from "../styles";

export const useKeyboardButtonStyles = (size?: KeyboardButtonSize) => {
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
