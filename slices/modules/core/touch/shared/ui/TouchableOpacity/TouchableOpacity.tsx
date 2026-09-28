import type {
	TouchableOpacityProps as BaseTouchableOpacityProps,
	ViewProps,
} from "react-native";

import { getActiveOpacity } from "@shared/lib";
import { TouchableOpacity as BaseTouchableOpacity } from "react-native";
import { usePressProps } from "../../lib";
import type { PressProps } from "../../model";

export type TouchableOpacityProps = Omit<
	BaseTouchableOpacityProps,
	"onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "onBlur" | "onFocus"
> &
	PressProps & {
		enabled?: boolean;
		// RN 0.81 types these differently for View and TouchableOpacity: use the View one
		onBlur?: ViewProps["onBlur"];
		onFocus?: ViewProps["onFocus"];
	};

export const TouchableOpacity = ({
	enabled = true,
	...props
}: TouchableOpacityProps) => {
	const { onBlur, onFocus, ...rest } = props;
	const pressProps = usePressProps(rest);
	const activeOpacity = getActiveOpacity(enabled);
	return (
		<BaseTouchableOpacity
			activeOpacity={activeOpacity}
			{...(rest as BaseTouchableOpacityProps)}
			{...pressProps}
			onBlur={onBlur as BaseTouchableOpacityProps["onBlur"]}
			onFocus={onFocus as BaseTouchableOpacityProps["onFocus"]}
		/>
	);
};
