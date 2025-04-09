import { useContext } from "react";
import type { ViewProps } from "react-native";
import { PortraitLayoutContext } from "../../../../../../config";
import { Clues, Resources } from "../../../../../shared";
import * as C from "./RightSidebar.components";

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({ ...props }: RightSidebarProps) => {
	const { height } = useContext(PortraitLayoutContext);

	return (
		<C.Container {...props} unit={height}>
			<Clues />
			<Resources />
		</C.Container>
	);
};
