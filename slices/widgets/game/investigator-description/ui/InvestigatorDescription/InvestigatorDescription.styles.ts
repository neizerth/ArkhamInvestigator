import type { Faction } from "@shared/model";
import type { RuleSet } from "styled-components";
import { css } from "styled-components/native";

export const descriptionSize = {
	width: 523,
	height: 591,
	ratio: 523 / 591,
};

export const getFactionStyle = (faction: Faction) => {
	const ruleSet: Record<Faction, RuleSet> = {
		neutral: css`
      padding-left: 10%;
      padding-right: 15%;
      padding-bottom: 5%;
    `,
		mystic: css`
      padding-left: 12%;
      padding-right: 12%;
      padding-bottom: 10%;
    `,
		rogue: css`
      padding-left: 6%;
      padding-right: 6%;
      padding-bottom: 5%;
    `,
		survivor: css`
      padding-left: 7%;
      padding-right: 7%;
      padding-bottom: 5%;
    `,
		seeker: css`
      padding-left: 9%;
      padding-right: 7%;
      padding-bottom: 5%;
    `,
		guardian: css`
      padding-left: 10%;
      padding-right: 11%;
      padding-bottom: 5%;
    `,
	};

	return ruleSet[faction];
};
