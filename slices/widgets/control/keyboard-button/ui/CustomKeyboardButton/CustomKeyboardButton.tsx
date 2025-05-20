import { useKeyboardButtonStyles } from "../../lib";
import type { KeyboardButtonProps } from "../../model";
import * as C from "./CustomKeyboardButton.components";

export type CustomKeyboardButtonProps = KeyboardButtonProps;

export const CustomKeyboardButton = ({
	...props
}: CustomKeyboardButtonProps) => {
	const style = useKeyboardButtonStyles(props);
	return <C.Container {...props} style={[props.style, style.button]} />;
};
