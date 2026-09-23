import type { InvestigatorMainStatType } from "@shared/model";
import { IconNumber, type IconNumberProps } from "@shared/ui";
import styled, { css } from "styled-components/native";
import { mainStatStyles } from "../MainStatFigure";

/** white digits with a colored outline, the way the compact assets carry them */
const createValue = (stat: InvestigatorMainStatType): typeof IconNumber =>
	styled(IconNumber).attrs({
		stroke: true,
		contentContainerStyle: {
			flex: 0,
		},
		strokeStyle: {
			color: mainStatStyles[stat].color,
		},
	})`
		font-size: 24px;
		${({ value = 0 }: IconNumberProps) =>
			value.toString().length > 1 &&
			css`
			font-size: 16px;
		`}
		color: white;
	`;

export const valueByStat = {
	health: createValue("health"),
	sanity: createValue("sanity"),
};
