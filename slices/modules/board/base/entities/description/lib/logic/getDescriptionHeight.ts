import {
	CAN_ALWAYS_SHOW_GAME_TEXT,
	isNavbarVisible,
	navBarHeight,
} from "@shared/config";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

type Options = {
	showGameText: boolean;
	gameTextHeight: number;
};

export const getDescriptionHeight = ({
	showGameText,
	gameTextHeight,
}: Options) => {
	if (!CAN_ALWAYS_SHOW_GAME_TEXT || !showGameText) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
	}

	const gap = isNavbarVisible ? navBarHeight - 5 : 50;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
