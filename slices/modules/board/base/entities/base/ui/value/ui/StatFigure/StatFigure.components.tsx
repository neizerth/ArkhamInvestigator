import {
	ActionStatBackground,
	AllyStatBackground,
	ClueStatBackground,
	DoomStatBackground,
	HandSizeStatBackground,
	HealthStatBackground,
	ResourceStatBackground,
	SanityStatBackground,
} from "@modules/core/theme/shared/ui";
import { IconNumber, type IconNumberProps } from "@shared/ui";
import styled, { css } from "styled-components/native";
import { statStyles } from "./StatFigure.styles";
import type { StatFigureType } from "./StatFigure.types";

export const backgroundByStat: Record<
	StatFigureType,
	typeof HealthStatBackground
> = {
	health: HealthStatBackground,
	sanity: SanityStatBackground,
	clues: ClueStatBackground,
	resources: ResourceStatBackground,
	actions: ActionStatBackground,
	doom: DoomStatBackground,
	handSize: HandSizeStatBackground,
	allySlots: AllyStatBackground,
};

/** the digits of a compact value: filled with the asset color and outlined */
const createValue = (stat: StatFigureType): typeof IconNumber => {
	const { color, valueColor, shrinkTwoDigits } = statStyles[stat];

	return styled(IconNumber).attrs({
		stroke: true,
		contentContainerStyle: {
			flex: 0,
		},
		strokeStyle: {
			color,
		},
	})`
		font-size: 24px;
		${({ value = 0 }: IconNumberProps) =>
			shrinkTwoDigits &&
			value.toString().length > 1 &&
			css`
			font-size: 16px;
		`}
		color: ${valueColor};
	`;
};

export const valueByStat = {
	health: createValue("health"),
	sanity: createValue("sanity"),
	clues: createValue("clues"),
	resources: createValue("resources"),
	actions: createValue("actions"),
	doom: createValue("doom"),
	handSize: createValue("handSize"),
	allySlots: createValue("allySlots"),
};
