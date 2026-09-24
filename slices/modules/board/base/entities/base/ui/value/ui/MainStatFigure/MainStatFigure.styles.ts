import type { StatSize } from "../StatFigure";
import type {
	MainStatSizeToken,
	MainStatStyle,
	MainStatType,
} from "./MainStatFigure.types";

export const mainStatSizes: Record<StatSize, MainStatSizeToken> = {
	small: {
		initialFontSize: 18,
		initialBottom: -10,
		initialBehind: true,
		initialSeparator: false,
	},
	medium: {
		initialFontSize: 24,
		initialBottom: -12,
		initialBehind: false,
		initialSeparator: true,
	},
};

export const mainStatStyles: Record<MainStatType, MainStatStyle> = {
	health: {
		initialRight: {
			small: -8,
			medium: -10,
		},
	},
	sanity: {
		initialRight: {
			small: -4,
			medium: 8,
		},
	},
};
