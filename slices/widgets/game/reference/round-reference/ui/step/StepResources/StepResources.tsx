import type { ViewProps } from "react-native";
import * as C from "./StepResources.components";

export type StepResourcesProps = ViewProps;

export const StepResources = (props: StepResourcesProps) => {
	return (
		<C.Container {...props}>
			<C.Icon />
		</C.Container>
	);
};
