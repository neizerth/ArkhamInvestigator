import { getKeyboardButtonSize } from "./size";
import type { KeyboardButtonStyleOptions } from "./withKeyboardButtonSize";

export const getKeyboardButtonStyle = (options: KeyboardButtonStyleOptions) => {
	const size = getKeyboardButtonSize(options);
	return {
		height: size,
	};
};
