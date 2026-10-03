import { BoardLoaderMemo as BoardLoader } from "@modules/board/base/features/load-board/ui";
import { selectScreenOrientationType } from "@modules/core/device/shared/lib";
import { useAppSelector, useLayoutSize } from "@shared/lib";
import { useWindowDimensions } from "react-native";
import { LayoutContext } from "../../config";
import { getHeaderLayout } from "../../lib";
import * as C from "./BoardPage.components";

export const BoardPage = () => {
	const window = useWindowDimensions();
	const orientationType = useAppSelector(selectScreenOrientationType);

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
					{orientationType === "portrait" && <C.PortraitLayout />}
				</C.Container>
			</BoardLoader>
		</LayoutContext.Provider>
	);
};
