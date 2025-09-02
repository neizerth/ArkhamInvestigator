import type { ViewProps, ViewStyle } from "react-native";
import * as C from "./Progress.components";

export type ProgressProps = ViewProps & {
	value: number;
};

export const Progress = ({ value, ...props }: ProgressProps) => {
	const valueStyle: ViewStyle = {
		width: `${value}%`,
	};

	return (
		<C.Container {...props}>
			<C.Value style={valueStyle} />
		</C.Container>
	);
};
