import { size } from "@shared/config";
import {
	selectShowDescription,
	useAppSelector,
	useLayoutSize,
	useScreenOrientation,
} from "@shared/lib";
import { useWindowDimensions } from "react-native";
import { LayoutContext, servicePadding } from "../../config";
import { getHeaderLayout, useImagePrelaod, useStatusBar } from "../../lib";
import { FactionSelect } from "../shared";
import * as C from "./BoardPage.components";

export const BoardPage = () => {
	useImagePrelaod();
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
			<C.Container onLayout={onLayout}>
				<C.Header layout={layout} descriptionShown={showDescription} />
				<C.Background />
				{orientation.type === "portrait" && <C.PortraitLayout top={areaTop} />}
				<FactionSelect />
			</C.Container>
		</LayoutContext.Provider>
	);
};
