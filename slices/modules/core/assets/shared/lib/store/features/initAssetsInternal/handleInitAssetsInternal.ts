import type { AssetsHandler } from "@modules/core/assets/shared/model";

export const handleInitAssetsInternal: AssetsHandler = (state) => {
	state.fontsLoaded = false;
	state.assetImagesLoaded = false;
	state.assetsLoaded = false;
};
