import type { Faction } from "@shared/model";
import { Platform } from "react-native";
import { css } from "styled-components/native";

export const factionDescriptionSize = {
	width: 523,
	height: 591,
	ratio: 523 / 591,
};

type Offsets = {
	paddingTop: number;

	paddingBottom: number;
	paddingLeft: number;
	paddingRight: number;
};

const offsetY = Platform.OS === "ios" ? 4 : 0;

export const factionDescriptionRelativeOffsets: Record<Faction, Offsets> = {
	neutral: {
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 15,
		paddingBottom: offsetY + 2,
	},
	mystic: {
		paddingTop: 9,
		paddingLeft: 12,
		paddingRight: 12,
		paddingBottom: offsetY + 4,
	},
	rogue: {
		paddingTop: 8,
		paddingLeft: 6,
		paddingRight: 6,
		paddingBottom: offsetY + 2,
	},
	survivor: {
		paddingTop: 10,
		paddingLeft: 7,
		paddingRight: 7,
		paddingBottom: offsetY + 2,
	},
	seeker: {
		paddingTop: 8,
		paddingLeft: 9,
		paddingRight: 7,
		paddingBottom: offsetY + 2,
	},
	guardian: {
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 11,
		paddingBottom: offsetY + 2,
	},
};

const toRuleSet = ({
	paddingTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
}: Offsets) => css`
  padding-top: ${paddingTop}%;
  padding-left: ${paddingLeft}%;
  padding-right: ${paddingRight}%;
  padding-bottom: ${paddingBottom}%;
`;

export const getFactionDescriptionStyle = (faction: Faction) => {
	const offsets = factionDescriptionRelativeOffsets[faction];
	return toRuleSet(offsets);
};
