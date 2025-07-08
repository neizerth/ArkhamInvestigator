import { CAN_ALWAYS_SHOW_GAME_TEXT, navBarHeight } from "@shared/config";

import { useAppSelector } from "@shared/lib";

import {
	selectAlwaysShowGameText,
	selectGameTextHeight,
} from "@modules/board/base/shared/lib";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

const isNavbarVisible = navBarHeight > 0;

export const useDescriptionHeight = () => {
	const show = useAppSelector(selectAlwaysShowGameText);
	const gameTextHeight = useAppSelector(selectGameTextHeight);

	if (!CAN_ALWAYS_SHOW_GAME_TEXT || !show) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
	}

	const gap = isNavbarVisible ? navBarHeight - 5 : 50;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
