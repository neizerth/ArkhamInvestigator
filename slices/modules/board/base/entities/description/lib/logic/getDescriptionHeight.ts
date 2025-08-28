import type { Faction } from "@modules/faction/shared/model";
import {
	factionDescriptionRelativeOffsets,
	factionDescriptionSize,
} from "@modules/faction/shared/ui";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import type { Box } from "@shared/model";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

type Options = {
	showGameText: boolean;
	gameTextSize?: Box | null;
	faction: Faction;
};

export const getDescriptionHeight = ({
	showGameText,
	gameTextSize,
	faction,
}: Options) => {
	if (!CAN_ALWAYS_SHOW_GAME_TEXT || !showGameText) {
		return DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT;
	}

	const gameTextHeight = gameTextSize?.height ?? 0;
	const gameTextWidth = gameTextSize?.width ?? 0;

	const offsets = factionDescriptionRelativeOffsets[faction];
	const width = gameTextWidth;

	const imageHeight = width / factionDescriptionSize.ratio;

	const offsetTop = Math.round(
		(imageHeight * (offsets.paddingTop + offsets.paddingBottom)) / 100,
	);

	const gap = offsetTop;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
