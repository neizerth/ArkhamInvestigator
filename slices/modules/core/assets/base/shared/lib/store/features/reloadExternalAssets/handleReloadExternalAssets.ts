import type { AssetsHandler } from "@modules/core/assets/base/shared/model";

export const handleReloadExternalAssets: AssetsHandler = (state, payload) => {
	state.externalImagesLoaded = false;
	state.externalImagesReady = false;
	state.externalAssetsDownloadedAt = null;
};
