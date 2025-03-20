import { LayoutContext, PortraitLayoutContext } from "@pages/board/config";
import type { RowProps } from "@shared/ui";
import { useContext } from "react";
import * as C from "./PortraitLayout.components";

export type PortraitLayoutProps = RowProps & {
	top: number;
};

export const PortraitLayout = ({ top, ...props }: PortraitLayoutProps) => {
	const { view } = useContext(LayoutContext);
	const height = view.height - top;

	const contextValue = {
		height,
	};

	const offset = { top };

	return (
		<PortraitLayoutContext.Provider value={contextValue}>
			<C.Container {...props}>
				<C.RightSidebar view={view} style={offset} />
				<C.LeftSidebar view={view} style={offset} />
				<C.Footer />
				<C.Overlay />
			</C.Container>
		</PortraitLayoutContext.Provider>
	);
};
