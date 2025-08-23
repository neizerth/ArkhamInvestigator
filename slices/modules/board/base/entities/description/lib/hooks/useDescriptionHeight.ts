import {
	CAN_ALWAYS_SHOW_GAME_TEXT,
	isNavbarVisible,
	navBarHeight,
} from "@shared/config";

import { useAppSelector } from "@shared/lib";

import {
	selectAlwaysShowGameText,
	selectBoardProp,
} from "@modules/board/base/shared/lib";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

export const useDescriptionHeight = () => {
	const show = useAppSelector(selectAlwaysShowGameText);
	const gameTextHeight = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "gameTextHeight",
		}),
	);

	if (!CAN_ALWAYS_SHOW_GAME_TEXT || !show) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
	}

	const gap = isNavbarVisible ? navBarHeight - 5 : 50;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
