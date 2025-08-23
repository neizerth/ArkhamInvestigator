import type { Faction } from "@modules/faction/shared/model";
import {
	factionDescriptionRelativeOffsets,
	factionDescriptionSize,
} from "@modules/faction/shared/ui";
import {
	CAN_ALWAYS_SHOW_GAME_TEXT,
	isNavbarVisible,
	navBarHeight,
} from "@shared/config";
import { Dimensions } from "react-native";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

type Options = {
	showGameText: boolean;
	gameTextHeight: number;
	faction: Faction;
};

const screen = Dimensions.get("screen");
const imageHeight = screen.width / factionDescriptionSize.ratio;

export const getDescriptionHeight = ({
	showGameText,
	gameTextHeight,
	faction,
}: Options) => {
	if (!CAN_ALWAYS_SHOW_GAME_TEXT || !showGameText) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
	}

	const offsets = factionDescriptionRelativeOffsets[faction];

	const offsetTop = Math.round((imageHeight * offsets.paddingTop) / 100);

	const gap = isNavbarVisible ? navBarHeight - 5 : offsetTop;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
