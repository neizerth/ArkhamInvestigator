import { selectTrackHandSize, useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import { PortraitLayoutContext } from "../../../../../../config";
import { HandSize } from "../../../../../shared/stats/HandSize";
import { Sidebar } from "../Sidebar";
import * as C from "./RightSidebar.components";

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({ ...props }: RightSidebarProps) => {
	const { height } = useContext(PortraitLayoutContext);
	const showHandSize = useAppSelector(selectTrackHandSize);

	return (
		<Sidebar {...props}>
			<C.Container unit={height} compact={showHandSize}>
				{showHandSize && <HandSize />}
				<C.Clues />
				<C.Resources />
			</C.Container>
		</Sidebar>
	);
};
