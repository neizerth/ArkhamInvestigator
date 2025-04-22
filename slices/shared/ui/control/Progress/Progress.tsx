import type { ViewProps } from "react-native";
import * as C from "./Progress.components";

export type ProgressProps = ViewProps & {
	value: number;
};

export const Progress = ({ value, ...props }: ProgressProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
