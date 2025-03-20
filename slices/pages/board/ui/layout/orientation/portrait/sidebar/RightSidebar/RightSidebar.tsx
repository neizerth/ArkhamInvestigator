import { PortraitLayoutContext } from "@pages/board/config";
import { Clues, Resources } from "@pages/board/ui/shared/stats";
import { useContext } from "react";
import type { ViewProps } from "react-native";
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
