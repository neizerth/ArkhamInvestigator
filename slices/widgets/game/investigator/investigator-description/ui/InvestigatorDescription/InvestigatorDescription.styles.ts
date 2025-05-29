import type { Faction } from "@shared/model";
import { Platform } from "react-native";
import type { RuleSet } from "styled-components";
import { css } from "styled-components/native";

export const descriptionSize = {
	width: 523,
	height: 591,
	ratio: 523 / 591,
};

const offsetY = Platform.OS === "ios" ? 4 : 0;

export const getFactionStyle = (faction: Faction) => {
	const ruleSet: Record<Faction, RuleSet> = {
		neutral: css`
      padding-left: 10%;
      padding-right: 15%;
      padding-bottom: ${offsetY + 2}%;
    `,
		mystic: css`
      padding-top: 9%;
      padding-left: 12%;
      padding-right: 12%;
      padding-bottom: ${offsetY + 4}%;
    `,
		rogue: css`
      padding-top: 8%;
      padding-left: 6%;
      padding-right: 6%;
      padding-bottom: ${offsetY + 2}%;
    `,
		survivor: css`
      padding-left: 7%;
      padding-right: 7%;
      padding-bottom: ${offsetY + 2}%;
    `,
		seeker: css`
      padding-top: 8%;
      padding-left: 9%;
      padding-right: 7%;
      padding-bottom: ${offsetY + 2}%;
    `,
		guardian: css`
      padding-left: 10%;
      padding-right: 11%;
      padding-bottom: ${offsetY + 2}%;
    `,
	};

	return ruleSet[faction];
};
