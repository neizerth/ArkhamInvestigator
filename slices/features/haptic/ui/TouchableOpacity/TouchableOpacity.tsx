import type { TouchableOpacityProps as BaseTouchableOpacityProps } from "react-native";

import { TouchableOpacity as BaseTouchableOpacity } from "react-native";
import { usePress } from "../../lib";
import type { PressProps } from "../../model";

export type TouchableOpacityProps = BaseTouchableOpacityProps & PressProps;

export const TouchableOpacity = (props: TouchableOpacityProps) => {
	const pressProps = usePress(props);
	return <BaseTouchableOpacity {...props} {...pressProps} />;
};
