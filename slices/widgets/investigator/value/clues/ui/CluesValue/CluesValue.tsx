import type { ViewProps } from "react-native";
import * as C from "./CluesValue.components";

export type CluesValueProps = ViewProps & {
	value: number;
};

export const CluesValue = ({ value, ...props }: CluesValueProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
