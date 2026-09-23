import { color, gameAssets } from "@shared/config";
import type { InvestigatorMainStatType } from "@shared/model";
import { VALUE_HEIGHT } from "../../config";
import type {
	MainStatSize,
	MainStatSizeToken,
	MainStatStyle,
} from "./MainStatFigure.types";

/** the board stat assets are drawn at this height before the picker scale is applied */
export const BOARD_HEIGHT = 70;

export const mainStatSizes: Record<MainStatSize, MainStatSizeToken> = {
	small: {
		height: VALUE_HEIGHT,
		scaled: false,
		roundWidth: false,
		center: false,
		initialFontSize: 18,
		initialBottom: -10,
		initialBehind: true,
		initialSeparator: false,
	},
	medium: {
		height: BOARD_HEIGHT,
		scaled: true,
		roundWidth: true,
		center: true,
		initialFontSize: 24,
		initialBottom: -12,
		initialBehind: false,
		initialSeparator: true,
	},
};

export const mainStatStyles: Record<InvestigatorMainStatType, MainStatStyle> = {
	health: {
		color: color.health,
		ratio: gameAssets.health.ratio,
		initialRight: {
			small: -8,
			medium: -10,
		},
	},
	sanity: {
		color: color.sanity,
		ratio: gameAssets.sanity.ratio,
		initialRight: {
			small: -4,
			medium: 8,
		},
	},
};

type FigureSizeOptions = {
	token: MainStatSizeToken;
	ratio: number;
	scale: number;
};

export const getFigureSize = ({ token, ratio, scale }: FigureSizeOptions) => {
	const height = token.height * (token.scaled ? scale : 1);
	const exactWidth = height * ratio;
	const width = token.roundWidth ? Math.round(exactWidth) : exactWidth;

	return { width, height };
};

export const getFigureStyle = (
	token: MainStatSizeToken,
	size: {
		width: number;
		height: number;
	},
) =>
	token.center
		? {
				...size,
				alignItems: "center" as const,
				justifyContent: "center" as const,
			}
		: { ...size, position: "relative" as const };
