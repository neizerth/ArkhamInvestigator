import { color, size } from "@shared/config";
import { assetsSize } from "../../../../config";

/** hand size and ally slots: counters that only carry a base value */
export type CapacityStatType = "handSize" | "allySlots";

type CapacityStatStyle = {
	color: string;
	testID: string;
	minWidth: number;
	paddingTop: number;
	paddingBottom: number;
	/** the asset itself sits slightly off its box */
	contentStyle?: { top: number };
	baseItemHeight: number;
	/** the base value difference hangs off the corner the asset leaves free */
	baseOffset: { right: number; top: number };
};

export const capacityStatStyles: Record<CapacityStatType, CapacityStatStyle> = {
	handSize: {
		color: color.handSize,
		testID: "hand-size",
		minWidth: assetsSize.main,
		paddingTop: size.gap.xxl,
		paddingBottom: size.gap.default,
		baseItemHeight: assetsSize.main,
		baseOffset: { right: -10, top: -5 },
	},
	allySlots: {
		color: color.ally,
		testID: "ally-slots",
		minWidth: assetsSize.ally,
		paddingTop: 0,
		paddingBottom: 0,
		contentStyle: { top: 2 },
		baseItemHeight: assetsSize.ally,
		baseOffset: { right: -20, top: -40 },
	},
};
