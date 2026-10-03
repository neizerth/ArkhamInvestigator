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

export const factionDescriptionRelativeOffsets: Record<Faction, Offsets> = {
	neutral: {
		paddingTop: 7,
		paddingLeft: 10,
		paddingRight: 15,
		paddingBottom: 2,
	},
	mystic: {
		paddingTop: 7,
		paddingLeft: 12,
		paddingRight: 12,
		paddingBottom: 4,
	},
	rogue: {
		paddingTop: 6.5,
		paddingLeft: 6,
		paddingRight: 6,
		paddingBottom: 2,
	},
	survivor: {
		paddingTop: 6,
		paddingLeft: 7,
		paddingRight: 7,
		paddingBottom: 2,
	},
	seeker: {
		paddingTop: 7,
		paddingLeft: 9,
		paddingRight: 7,
		paddingBottom: 2,
	},
	guardian: {
		paddingTop: 8.5,
		paddingLeft: 10,
		paddingRight: 11,
		paddingBottom: 2,
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
	const offsetY = Platform.OS === "ios" ? 4 : 0;

	return toRuleSet({
		...offsets,
		paddingBottom: offsets.paddingBottom + offsetY,
	});
};
