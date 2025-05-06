import type { ViewProps } from "react-native";
import * as C from "./ActionsValue.components";

export type ActionsValueProps = ViewProps & {
	value: number;
};

export const ActionsValue = ({ value, ...props }: ActionsValueProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
