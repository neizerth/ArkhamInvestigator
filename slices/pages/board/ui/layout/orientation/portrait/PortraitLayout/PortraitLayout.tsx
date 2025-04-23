import type { RowProps } from "@shared/ui";
import { useContext } from "react";
import { LayoutContext, PortraitLayoutContext } from "../../../../../config";
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

	return (
		<PortraitLayoutContext.Provider value={contextValue}>
			<C.Container {...props}>
				<C.Header />
				<C.SkillChecks />
				<C.Main>
					<C.LeftSidebar />
					<C.Area />
					<C.RightSidebar />
				</C.Main>
				<C.Footer />
				<C.Overlay />
			</C.Container>
		</PortraitLayoutContext.Provider>
	);
};
