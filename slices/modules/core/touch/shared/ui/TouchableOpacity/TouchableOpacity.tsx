import type { TouchableOpacityProps as BaseTouchableOpacityProps } from "react-native";

import { getActiveOpacity } from "@shared/lib";
import { TouchableOpacity as BaseTouchableOpacity } from "react-native";
import { usePressProps } from "../../lib";
import type { PressProps } from "../../model";

export type TouchableOpacityProps = Omit<
	BaseTouchableOpacityProps,
	"onPress" | "onPressIn" | "onPressOut" | "onLongPress"
> &
	PressProps & {
		enabled?: boolean;
	};

export const TouchableOpacity = ({
	enabled = true,
	...props
}: TouchableOpacityProps) => {
	const pressProps = usePressProps(props);
	const activeOpacity = getActiveOpacity(enabled);
	return (
		<BaseTouchableOpacity
			activeOpacity={activeOpacity}
			{...props}
			{...pressProps}
		/>
	);
};
