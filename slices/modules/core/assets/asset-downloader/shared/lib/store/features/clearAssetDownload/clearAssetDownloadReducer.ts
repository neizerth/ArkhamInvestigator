import type { AssetDownloaderReducer } from "@modules/core/assets/asset-downloader/shared/model";
import { handleClearAssetDownload } from "./handleClearAssetDownload";

export const clearAssetDownloadReducer: AssetDownloaderReducer = (
	state,
	{ payload },
) => {
	handleClearAssetDownload(state, payload);
};
