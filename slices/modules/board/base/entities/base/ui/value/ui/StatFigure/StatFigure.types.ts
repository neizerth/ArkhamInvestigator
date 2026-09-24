/** the stats that are drawn inside a game asset */
export type StatFigureType =
	| "health"
	| "sanity"
	| "clues"
	| "resources"
	| "actions"
	| "doom"
	| "handSize"
	| "allySlots";

/** small is the compact value, medium is the board stat */
export type StatSize = "small" | "medium";

export type StatSizeToken = {
	/** the board stats follow the picker size setting, the compact ones do not */
	scaled: boolean;
	/** the board rounds the scaled width, the compact one keeps the exact ratio */
	roundWidth: boolean;
	/** the board centers the picker inside the asset */
	center: boolean;
};

export type StatStyle = {
	/** the asset ratio, the figure width follows it */
	ratio: number;
	/** the stat color, used for the outline and by the board digits */
	color: string;
	/** the digits drawn on top of the asset */
	valueColor: string;
	height: Record<StatSize, number>;
};
