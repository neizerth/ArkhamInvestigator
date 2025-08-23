import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { Dimensions } from "react-native";

const view = Dimensions.get("screen");

export const useCurrentBackground = () => {
	const image = useAppSelector(selectCurrentBoardProp("image"));
	const layout = useAppSelector(selectCurrentBoardProp("imageLayout"));

	if (!layout) {
		return;
	}

	/*
		getImageLayout({
			image,
			view,
			offsetBottom,
		})
	*/

	return {
		code: image.id,
		layout,
		type: "full" as const,
	};
};
