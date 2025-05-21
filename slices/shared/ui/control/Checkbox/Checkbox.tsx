import type { TextStyle, ViewProps, ViewStyle } from "react-native";
import * as C from "./Checkbox.components";

export type CheckboxProps = ViewProps & {
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
	label,
	...props
}: CheckboxProps) => {
	const icon = checked ? "checklist" : "circle-thin";

	return (
		<C.Container {...props}>
			<C.Label>{label}</C.Label>
			<C.Control icon={icon} />
			{children}
		</C.Container>
	);
};
