/** small is the compact value, medium is the board stat */
export type MainStatSize = "small" | "medium";

export type MainStatSizeToken = {
	height: number;
	/** the board stats follow the picker size setting, the compact ones do not */
	scaled: boolean;
	/** the board rounds the scaled width, the compact one keeps the exact ratio */
	roundWidth: boolean;
	/** the board centers the picker inside the asset */
	center: boolean;
	initialFontSize: number;
	initialBottom: number;
	/** the compact badge slides behind the asset, the board one stays on top */
	initialBehind: boolean;
	/** the board crosses the initial value out with a slash */
	initialSeparator: boolean;
};

export type MainStatStyle = {
	color: string;
	ratio: number;
	/** the badge hangs off the corner the asset leaves free, which differs per size */
	initialRight: Record<MainStatSize, number>;
};
