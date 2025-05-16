import { getKeyboardButtonTextSize } from "./size";
import type { KeyboardButtonStyleOptions } from "./withKeyboardButtonSize";

export const getKeyboardButtonTextStyle = (
	options: KeyboardButtonStyleOptions,
) => {
	const size = getKeyboardButtonTextSize(options);
	return {
		fontSize: size,
	};
};
