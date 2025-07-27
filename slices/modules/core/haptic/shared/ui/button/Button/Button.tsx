import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useCallback } from "react";
import {
	type GestureResponderEvent,
	Linking,
	type TextProps,
} from "react-native";
import * as C from "./Button.components";

export type ButtonProps = TouchableOpacityProps & {
	text?: string;
	textStyle?: TextProps["style"];
	icon?: string;
	iconStyle?: TextProps["style"];
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
			const response = onPress?.(e);
			if (href) {
				Linking.openURL(href);
			}
			return response;
		},
		[onPress, href],
	);
	return (
		<C.Container {...props} onPress={handlePress}>
			{icon && <C.Icon style={iconStyle} icon={icon} />}
			{text && <C.Text style={textStyle} value={text} />}
			{children}
		</C.Container>
	);
};
