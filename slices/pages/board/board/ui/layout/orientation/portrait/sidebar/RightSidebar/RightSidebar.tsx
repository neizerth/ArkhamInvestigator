import { selectShowDoom, useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import { PortraitLayoutContext } from "../../../../../../config";
import { Clues, Doom, Resources } from "../../../../../shared";
import { Sidebar } from "../Sidebar";
import * as C from "./RightSidebar.components";

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({ ...props }: RightSidebarProps) => {
	const showDoom = useAppSelector(selectShowDoom);
	const { height } = useContext(PortraitLayoutContext);

	return (
		<Sidebar {...props}>
			<C.Container unit={height} showDoom={showDoom}>
				{showDoom && <Doom />}
				<Clues />
				<Resources />
			</C.Container>
		</Sidebar>
	);
};
