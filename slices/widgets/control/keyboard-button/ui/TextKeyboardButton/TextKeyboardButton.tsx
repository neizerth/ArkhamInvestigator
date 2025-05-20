import type { TextProps } from "react-native";
import { useKeyboardButtonStyles } from "../../lib";
import type { KeyboardButtonProps } from "../../model";
import * as C from "./TextKeyboardButton.components";

export type TextKeyboardButtonProps = KeyboardButtonProps & {
	textStyle?: TextProps["style"];
	selectedTextStyle?: TextProps["style"];
};

export const TextKeyboardButton = ({
	children,
	textStyle,
	...props
}: TextKeyboardButtonProps) => {
	const { size, buttonType, selected, selectedTextStyle } = props;
	const style = useKeyboardButtonStyles(props);
	return (
		<C.Container {...props} style={[props.style, style.button]}>
			<C.Text
				style={[textStyle, style.text, selected && selectedTextStyle]}
				size={size}
				buttonType={buttonType}
				selected={selected}
			>
				{children}
			</C.Text>
		</C.Container>
	);
};
