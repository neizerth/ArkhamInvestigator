import type { ViewProps } from "react-native";
import * as C from "./SanityValue.components";

export type SanityValueProps = ViewProps & {
	value: number;
};

export const SanityValue = ({ value, ...props }: SanityValueProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
