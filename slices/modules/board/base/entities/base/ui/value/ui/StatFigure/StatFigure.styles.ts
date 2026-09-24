import { color, gameAssets } from "@shared/config";
import { VALUE_HEIGHT } from "../../config";
import type {
	StatFigureType,
	StatSize,
	StatSizeToken,
	StatStyle,
} from "./StatFigure.types";

/** board asset heights, before the picker scale is applied */
const boardHeight = {
	main: 70,
	action: 65,
	resource: 73,
	ally: 65,
};

export const statSizes: Record<StatSize, StatSizeToken> = {
	small: {
		scaled: false,
		roundWidth: false,
		center: false,
	},
	medium: {
		scaled: true,
		roundWidth: true,
		center: true,
	},
};

const height = (medium: number) => ({
	small: VALUE_HEIGHT,
	medium,
});

export const statStyles: Record<StatFigureType, StatStyle> = {
	health: {
		ratio: gameAssets.health.ratio,
		color: color.health,
		valueColor: color.white,
		height: height(boardHeight.main),
		shrinkTwoDigits: true,
	},
	sanity: {
		ratio: gameAssets.sanity.ratio,
		color: color.sanity,
		valueColor: color.white,
		height: height(boardHeight.main),
		shrinkTwoDigits: true,
	},
	clues: {
		ratio: gameAssets.clue.ratio,
		color: color.clue,
		valueColor: color.white,
		height: height(boardHeight.main),
		shrinkTwoDigits: false,
	},
	resources: {
		ratio: gameAssets.resource.ratio,
		color: color.resource,
		valueColor: color.white,
		height: height(boardHeight.resource),
		shrinkTwoDigits: false,
	},
	actions: {
		ratio: gameAssets.action.ratio,
		color: color.action,
		valueColor: color.white,
		height: height(boardHeight.action),
		shrinkTwoDigits: false,
	},
	handSize: {
		ratio: gameAssets.handSize.ratio,
		color: color.handSize,
		valueColor: color.white,
		height: height(boardHeight.main),
		shrinkTwoDigits: false,
	},
	allySlots: {
		ratio: gameAssets.ally.ratio,
		color: color.ally,
		valueColor: color.white,
		height: height(boardHeight.ally),
		shrinkTwoDigits: false,
	},
	doom: {
		ratio: gameAssets.doom.ratio,
		// the doom asset carries its own palette, darker than the shared doom color
		color: "#660b11",
		valueColor: "#e3cfb4",
		height: height(boardHeight.main),
		shrinkTwoDigits: false,
	},
};

type FigureSizeOptions = {
	stat: StatFigureType;
	size: StatSize;
	scale: number;
};

export const getFigureSize = ({ stat, size, scale }: FigureSizeOptions) => {
	const token = statSizes[size];
	const { ratio, height: heights } = statStyles[stat];

	const figureHeight = heights[size] * (token.scaled ? scale : 1);
	const exactWidth = figureHeight * ratio;
	const width = token.roundWidth ? Math.round(exactWidth) : exactWidth;

	return { width, height: figureHeight };
};

type FigureSize = ReturnType<typeof getFigureSize>;

export const getFigureStyle = (size: StatSize, figureSize: FigureSize) =>
	statSizes[size].center
		? {
				...figureSize,
				alignItems: "center" as const,
				justifyContent: "center" as const,
			}
		: { ...figureSize, position: "relative" as const };
