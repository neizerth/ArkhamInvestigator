import type { ViewProps } from "react-native";
import * as C from "./Sanity.components";

export type SanityProps = ViewProps & {
	value: number;
};

export const Sanity = ({ value, ...props }: SanityProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
