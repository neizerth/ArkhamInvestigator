import type { ViewProps } from "react-native";
import * as C from "./Health.components";

export type HealthProps = ViewProps & {
	value: number;
};

export const Health = ({ value, ...props }: HealthProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
