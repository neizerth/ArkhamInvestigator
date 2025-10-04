import type { Faction } from "@modules/faction/shared/model";
import {
	factionDescriptionRelativeOffsets,
	factionDescriptionSize,
} from "@modules/faction/shared/ui";
import {
	CAN_ALWAYS_SHOW_GAME_TEXT,
	IOS_WITH_GESTURE_CONTROL,
	size,
} from "@shared/config";
import type { Box } from "@shared/model";
import { Platform } from "react-native";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../config";

type Options = {
	showGameText: boolean;
	gameTextSize?: Box | null;
	faction: Faction;
};

const ios = Platform.OS === "ios";
const platformGap = IOS_WITH_GESTURE_CONTROL ? size.gap.medium : 0;

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

	const offsetTop = Math.round((imageHeight * offsets.paddingTop) / 100);

	const gap = offsetTop + size.gap.default + platformGap;

	const fullHeight = gameTextHeight + gap;

	return Math.max(fullHeight, DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT);
};
