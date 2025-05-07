import { useContext } from "react";
import type { ViewProps } from "react-native";
import { PortraitLayoutContext } from "../../../../../../config";
import { InvestigatorClues, Resources } from "../../../../../shared";
import { Sidebar } from "../Sidebar";
import * as C from "./RightSidebar.components";

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({ ...props }: RightSidebarProps) => {
	const { height } = useContext(PortraitLayoutContext);

	return (
		<Sidebar {...props}>
			<C.Container unit={height}>
				<InvestigatorClues />
				<Resources />
			</C.Container>
		</Sidebar>
	);
};
