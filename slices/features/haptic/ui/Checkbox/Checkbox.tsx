import { useCallback } from "react";
import type { GestureResponderEvent, TextStyle, ViewStyle } from "react-native";
import { useHapticFeedback } from "../../lib/hooks/useHapticFeedback";
import type { TouchableOpacityProps } from "../TouchableOpacity";
import * as C from "./Checkbox.components";

export type CheckboxProps = TouchableOpacityProps & {
	contentContainerStyle?: ViewStyle;
	controlStyle?: TextStyle;
	checked?: boolean;
	label?: string;
};
export const Checkbox = ({
	contentContainerStyle,
	controlStyle,
	checked,
	children,
	onPress: onPressProp,
	label,
	...props
}: CheckboxProps) => {
	const icon = checked ? "checklist" : "circle-thin";
	const hapticFeedback = useHapticFeedback();

	const onPress = useCallback(
		(e: GestureResponderEvent) => {
			hapticFeedback();
			onPressProp?.(e);
		},
		[onPressProp, hapticFeedback],
	);

	return (
		<C.Container {...props} onPress={onPress}>
			<C.Label>{label}</C.Label>
			<C.Control icon={icon} />
			{children}
		</C.Container>
	);
};
