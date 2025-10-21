import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import type { TextStyle, ViewStyle } from "react-native";
import * as C from "./Checkbox.components";

export type CheckboxProps = TouchableOpacityProps & {
	contentContainerStyle?: ViewStyle;
	align?: "left" | "right";
	checkedIcon?: string;
	uncheckedIcon?: string;
	contentStyle?: ViewStyle;
	controlStyle?: TextStyle;
	checked?: boolean;
	label?: string;
	hint?: string;
};

export const Checkbox = ({
	contentContainerStyle,
	align = "right",
	controlStyle,
	contentStyle,
	checked,
	children,
	label,
	hint,
	checkedIcon = "checklist",
	uncheckedIcon = "circle-thin",
	...props
}: CheckboxProps) => {
	const icon = checked ? checkedIcon : uncheckedIcon;

	return (
		<C.Container {...props}>
			<C.Content style={contentStyle}>
				{align === "right" && <C.Label>{label}</C.Label>}
				<C.Control icon={icon} style={controlStyle} />
				{align === "left" && <C.Label>{label}</C.Label>}
				{children}
			</C.Content>
			{hint && <C.Hint>{hint}</C.Hint>}
		</C.Container>
	);
};
