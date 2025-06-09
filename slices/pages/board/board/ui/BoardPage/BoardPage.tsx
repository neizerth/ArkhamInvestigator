import { InvesigatorCode } from "@shared/config";
import { useLayoutSize, useScreenOrientation } from "@shared/lib";
import { useWindowDimensions } from "react-native";
import { LayoutContext } from "../../config";
import {
	getHeaderLayout,
	useChangeInvestigatorAfterDefeat,
	useImagePrelaod,
	useStatusBar,
} from "../../lib";
import * as C from "./BoardPage.components";

export const BoardPage = () => {
	useImagePrelaod();
	const window = useWindowDimensions();
	const orientation = useScreenOrientation();
	useStatusBar();

	useChangeInvestigatorAfterDefeat([InvesigatorCode.HankSamson]);

	const [view, onLayout] = useLayoutSize(window);

	const layout = getHeaderLayout(view);

	const contextValue = {
		view,
		layout,
	};

	return (
		<LayoutContext.Provider value={contextValue}>
			<C.Container onLayout={onLayout}>
				<C.Background />
				{orientation.type === "portrait" && <C.PortraitLayout />}
				<C.FactionModal />
			</C.Container>
		</LayoutContext.Provider>
	);
};
