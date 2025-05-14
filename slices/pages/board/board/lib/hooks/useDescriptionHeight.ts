import { CAN_ALWAYS_SHOW_GAME_TEXT, navbarHeight } from "@shared/config";

import {
	selectAlwaysShowGameText,
	selectGameTextHeight,
	useAppSelector,
} from "@shared/lib";

import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

const isNavbarVisible = navbarHeight > 0;

export const useDescriptionHeight = () => {
	const show = useAppSelector(selectAlwaysShowGameText);
	const gameTextHeight = useAppSelector(selectGameTextHeight);

	if (!CAN_ALWAYS_SHOW_GAME_TEXT || !show) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
	}

	const gap = isNavbarVisible ? navbarHeight - 5 : 40;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
