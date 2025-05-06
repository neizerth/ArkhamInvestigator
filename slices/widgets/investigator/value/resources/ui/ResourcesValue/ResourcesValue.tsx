import type { ViewProps } from "react-native";
import * as C from "./ResourcesValue.components";

export type ResourcesValueProps = ViewProps & {
	value: number;
};

export const ResourcesValue = ({ value, ...props }: ResourcesValueProps) => {
	return (
		<C.Container {...props}>
			<C.Value value={value} />
		</C.Container>
	);
};
