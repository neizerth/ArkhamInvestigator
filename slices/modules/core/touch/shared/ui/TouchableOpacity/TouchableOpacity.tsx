import type { TouchableOpacityProps as BaseTouchableOpacityProps } from "react-native";

import { TouchableOpacity as BaseTouchableOpacity } from "react-native";
import { usePressProps } from "../../lib";
import type { PressProps } from "../../model";

export type TouchableOpacityProps = Omit<
	BaseTouchableOpacityProps,
	"onPress" | "onPressIn" | "onPressOut" | "onLongPress"
> &
	PressProps;

export const TouchableOpacity = (props: TouchableOpacityProps) => {
	const pressProps = usePressProps(props);
	return <BaseTouchableOpacity {...props} {...pressProps} />;
};
