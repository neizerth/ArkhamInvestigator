import { servicePadding } from "@pages/board/config";
import { LayoutContext } from "@pages/board/config/context";
import { getHeaderLayout, useStatusBar } from "@pages/board/lib";
import { size } from "@shared/config";
import {
	selectCurrentBoard,
	selectShowDescription,
	useAppSelector,
	useLayoutSize,
	useScreenOrientation,
} from "@shared/lib";
import { useWindowDimensions } from "react-native";
import * as C from "./BoardPage.components";

export const BoardPage = () => {
	const isBoardExists = useAppSelector(
		(state) => selectCurrentBoard(state) !== null,
	);
	const window = useWindowDimensions();
	const orientation = useScreenOrientation();
	const showDescription = useAppSelector(selectShowDescription);
	useStatusBar();

	const [view, onLayout] = useLayoutSize(window);

	const layout = getHeaderLayout(view);

	const areaTop =
		layout.height + servicePadding[layout.type].top + size.gap.large;

	const contextValue = {
		view,
		layout,
	};

	return (
		<LayoutContext.Provider value={contextValue}>
			{isBoardExists && (
				<C.Container onLayout={onLayout}>
					<C.Header layout={layout} descriptionShown={showDescription} />
					<C.Background />
					{orientation.type === "portrait" && (
						<C.PortraitLayout top={areaTop} />
					)}
				</C.Container>
			)}
		</LayoutContext.Provider>
	);
};
