import type { ViewProps } from "react-native";
import * as C from "./ChaosBagReferencePage.components";

export type ChaosBagReferencePageProps = ViewProps;

export const ChaosBagReferencePage = (props: ChaosBagReferencePageProps) => {
	return (
		<C.Container {...props} title="Scenario reference">
			<C.Select />
		</C.Container>
	);
};
