import images from "@assets/images";
import type { AssetsHandler } from "@modules/core/assets/base/shared/model";

export const handleInitAssetsInternal: AssetsHandler = (state) => {
	state.assetImagesCount = images.length;
	state.assetImagesLoadedCount = 0;
	state.fontsLoaded = false;
	state.assetImagesLoaded = false;
	state.assetsLoaded = false;
};
