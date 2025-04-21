import { size, statusBarHeight } from "@shared/config";
import { useLayoutSize, useScreenOrientation } from "@shared/lib";
import { useWindowDimensions } from "react-native";
import { LayoutContext } from "../../config";
import { getHeaderLayout, useImagePrelaod, useStatusBar } from "../../lib";
import { FactionSelect } from "../shared";
import * as C from "./BoardPage.components";

export const BoardPage = () => {
	useImagePrelaod();
	const window = useWindowDimensions();
	const orientation = useScreenOrientation();
	useStatusBar();

	const [view, onLayout] = useLayoutSize(window);

	const layout = getHeaderLayout(view);

	const areaTop = layout.height + statusBarHeight + size.gap.large;

	const contextValue = {
		view,
		layout,
	};

	return (
		<LayoutContext.Provider value={contextValue}>
			<C.Container onLayout={onLayout}>
				<C.Background />
				{orientation.type === "portrait" && <C.PortraitLayout top={areaTop} />}
				<FactionSelect />
			</C.Container>
		</LayoutContext.Provider>
	);
};
