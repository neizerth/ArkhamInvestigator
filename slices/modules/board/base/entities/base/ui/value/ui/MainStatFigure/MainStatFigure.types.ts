import type { StatSize } from "../StatFigure";

/** health and sanity are the only stats with an initial value badge */
export type MainStatType = "health" | "sanity";

export type MainStatSizeToken = {
	initialFontSize: number;
	initialBottom: number;
	/** the compact badge slides behind the asset, the board one stays on top */
	initialBehind: boolean;
	/** the board crosses the initial value out with a slash */
	initialSeparator: boolean;
};

export type MainStatStyle = {
	/** the badge hangs off the corner the asset leaves free, which differs per size */
	initialRight: Record<StatSize, number>;
};
