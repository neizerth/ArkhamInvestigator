import type { ViewProps } from "react-native";
import * as C from "./HealthValue.components";

export type HealthValueProps = ViewProps & {
	value: number;
};

export const HealthValue = ({ value, ...props }: HealthValueProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
