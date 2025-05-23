import type { CheckboxProps } from "@shared/ui";
import { useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import { useHapticFeedback } from "../../../lib/hooks/useHapticFeedback";
import type { TouchableOpacityProps } from "../../TouchableOpacity";
import * as C from "./HapticCheckbox.components";

export type HapticCheckboxProps = CheckboxProps & TouchableOpacityProps;

export const HapticCheckbox = ({
	onPress: onPressProp,
	...props
}: HapticCheckboxProps) => {
	const { contentContainerStyle } = props;
	const hapticFeedback = useHapticFeedback();

	const onPress = useCallback(
		(e: GestureResponderEvent) => {
			hapticFeedback();
			onPressProp?.(e);
		},
		[onPressProp, hapticFeedback],
	);

	return (
		<C.Container style={contentContainerStyle} onPress={onPress}>
			<C.Control {...props} />
		</C.Container>
	);
};
