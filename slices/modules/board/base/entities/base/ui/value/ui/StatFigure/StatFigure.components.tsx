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
import { Value } from "@shared/ui";
import styled from "styled-components/native";
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

/**
 * The digits of a compact value: white (or the asset tint) with a colored outline. The
 * font follows the digit count, the same way the board values do.
 */
const createValue = (stat: StatFigureType): typeof Value => {
	const { color, valueColor } = statStyles[stat];

	return styled(Value).attrs({
		testID: `${stat}-value`,
		stroke: true,
		contentContainerStyle: {
			flex: 0,
		},
		textStyle: {
			color: valueColor,
		},
	})`
		font-size: 24px;
		color: ${color};
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
