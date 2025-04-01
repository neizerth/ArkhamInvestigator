import { LayoutContext, PortraitLayoutContext } from "@pages/board/config";
import { selectShowDescription, useAppSelector } from "@shared/lib";
import type { RowProps } from "@shared/ui";
import { useContext } from "react";
import * as C from "./PortraitLayout.components";

export type PortraitLayoutProps = RowProps & {
	top: number;
};

export const PortraitLayout = ({ top, ...props }: PortraitLayoutProps) => {
	const showDescription = useAppSelector(selectShowDescription);
	const { view } = useContext(LayoutContext);
	const height = view.height - top;

	const contextValue = {
		height,
	};

	const sidebarStyle = {
		top,
		zIndex: showDescription ? 1 : 4,
	};

	return (
		<PortraitLayoutContext.Provider value={contextValue}>
			<C.Container {...props}>
				<C.RightSidebar view={view} style={sidebarStyle} />
				<C.LeftSidebar view={view} style={sidebarStyle} />
				<C.Footer />
				<C.Overlay />
			</C.Container>
		</PortraitLayoutContext.Provider>
	);
};
