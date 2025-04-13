import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSettingsControl.components";

export type InvestigatorSettingsControlProps = ViewProps & {
	onIncrement: () => void;
	onDecrement: () => void;
};

export const InvestigatorSettingsControl = ({
	onDecrement,
	onIncrement,
	children,
	...props
}: InvestigatorSettingsControlProps) => {
	return (
		<C.Container {...props}>
			<C.Button onPress={onDecrement} text="–" />
			{children}
			<C.Button onPress={onIncrement} text="+" />
		</C.Container>
	);
};
