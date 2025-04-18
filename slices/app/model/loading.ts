export type AppLoadState = {
	assets: AssetsLoadState;
	fontsLoaded: boolean;
	done: boolean;
};

export type AssetsLoadState = {
	total: number;
	loadedCount: number;
	done: boolean;
};
