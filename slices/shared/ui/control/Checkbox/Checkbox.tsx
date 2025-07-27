import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import type { TextStyle, ViewStyle } from "react-native";
import * as C from "./Checkbox.components";

export type CheckboxProps = TouchableOpacityProps & {
	contentContainerStyle?: ViewStyle;
	contentStyle?: ViewStyle;
	controlStyle?: TextStyle;
	checked?: boolean;
	label?: string;
	hint?: string;
};

export const Checkbox = ({
	contentContainerStyle,
	controlStyle,
	contentStyle,
	checked,
	children,
	label,
	hint,
	...props
}: CheckboxProps) => {
	const icon = checked ? "checklist" : "circle-thin";

	return (
		<C.Container {...props}>
			<C.Content style={contentStyle}>
				<C.Label>{label}</C.Label>
				<C.Control icon={icon} style={controlStyle} />
				{children}
			</C.Content>
			{hint && <C.Hint>{hint}</C.Hint>}
		</C.Container>
	);
};
