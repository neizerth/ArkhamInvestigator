import type { Faction } from "@shared/model";
import { RuleSet } from "styled-components";
import { css } from "styled-components/native";

export const getFactionStyle = (faction: Faction) => {
  const ruleSet: Record<Faction, RuleSet> = {
    neutral: css`
      padding-left: 10%;
      padding-right: 12%;
      padding-bottom: 15%;
    `,
    mystic: css`
      padding-left: 10%;
      padding-right: 10%;
      padding-bottom: 10%;
    `,
    rogue: css`
      padding-left: 10%;
      padding-right: 10%;
      padding-bottom: 21%;
    `,
    survivor: css`
      padding-left: 7%;
      padding-right: 7%;
      padding-bottom: 5%;
    `,
    seeker: css`
      padding-top: 10%;
      padding-left: 12%;
      padding-right: 15%;
      padding-bottom: 5%;
    `,
    guardian: css`
      padding-left: 12%;
      padding-right: 15%;
      padding-bottom: 5%;
    `
  }

  return ruleSet[faction];
}