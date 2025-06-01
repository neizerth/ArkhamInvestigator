import type { TextStyle, ViewProps, ViewStyle } from "react-native";
import * as C from "./Checkbox.components";

export type CheckboxProps = ViewProps & {
	contentContainerStyle?: ViewStyle;
	controlStyle?: TextStyle;
	checked?: boolean;
	label?: string;
	hint?: string;
};

export const Checkbox = ({
	contentContainerStyle,
	controlStyle,
	checked,
	children,
	label,
	hint,
	...props
}: CheckboxProps) => {
	const icon = checked ? "checklist" : "circle-thin";

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Label>{label}</C.Label>
				<C.Control icon={icon} />
				{children}
			</C.Content>
			{hint && <C.Hint>{hint}</C.Hint>}
		</C.Container>
	);
};
