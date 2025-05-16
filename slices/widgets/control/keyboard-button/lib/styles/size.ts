import { keyboardButtonSize, keyboardButtonTextSize } from "../../config";
import { withKeyboardButtonsSize } from "./withKeyboardButtonSize";

export const getKeyboardButtonSize =
	withKeyboardButtonsSize(keyboardButtonSize);

export const getKeyboardButtonTextSize = withKeyboardButtonsSize(
	keyboardButtonTextSize,
);
