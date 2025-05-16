import type { TextProps } from "react-native";
import { useKeyboardButtonStyles } from "../../lib";
import type { KeyboardButtonProps } from "../../model";
import * as C from "./TextKeyboardButton.components";

export type TextKeyboardButtonProps = KeyboardButtonProps & {
	textStyle?: TextProps["style"];
};

export const TextKeyboardButton = ({
	children,
	textStyle,
	...props
}: TextKeyboardButtonProps) => {
	const { size, buttonType } = props;
	const style = useKeyboardButtonStyles(size);
	return (
		<C.Container {...props} style={[props.style, style.button]}>
			<C.Text
				style={[textStyle, style.text]}
				size={size}
				buttonType={buttonType}
			>
				{children}
			</C.Text>
		</C.Container>
	);
};
