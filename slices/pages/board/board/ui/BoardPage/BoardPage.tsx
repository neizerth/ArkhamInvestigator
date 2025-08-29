import { BoardLoader } from "@modules/board/base/features/load-board/ui";
import { useLayoutSize, useScreenOrientation } from "@shared/lib";
import { useWindowDimensions } from "react-native";
import { LayoutContext } from "../../config";
import { getHeaderLayout } from "../../lib";
import * as C from "./BoardPage.components";

export const BoardPage = () => {
	const window = useWindowDimensions();
	const orientation = useScreenOrientation();

	const [view, onLayout] = useLayoutSize(window);

	const layout = getHeaderLayout(view);

	const contextValue = {
		view,
		layout,
	};

	return (
		<LayoutContext.Provider value={contextValue}>
			<BoardLoader>
				<C.Container onLayout={onLayout}>
					<C.Background />
					{orientation.type === "portrait" && <C.PortraitLayout />}
				</C.Container>
			</BoardLoader>
		</LayoutContext.Provider>
	);
};
