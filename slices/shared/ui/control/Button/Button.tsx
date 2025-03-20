import type { TouchableOpacityProps } from "@shared/ui/behavior";
import { useCallback } from "react";
import {
	type GestureResponderEvent,
	Linking,
	type TextStyle,
} from "react-native";
import * as C from "./Button.components";

export type ButtonProps = TouchableOpacityProps & {
	text?: string;
	textStyle?: TextStyle;
	icon?: string;
	iconStyle?: TextStyle;
	href?: string;
};

export const Button = ({
	text,
	textStyle,
	children,
	icon,
	iconStyle,
	href,
	onPress,
	...props
}: ButtonProps) => {
	const handlePress = useCallback(
		(e: GestureResponderEvent) => {
			onPress?.(e);
			if (href) {
				Linking.openURL(href);
			}
		},
		[onPress, href],
	);
	return (
		<C.Container {...props} onPress={handlePress}>
			{icon && <C.Icon style={iconStyle} icon={icon} />}
			{text && <C.Text style={textStyle}>{text}</C.Text>}
			{children}
		</C.Container>
	);
};
