import type { AssetDownloaderHandler } from "@modules/core/assets/asset-downloader/shared/model";

export const handleClearAssetDownload: AssetDownloaderHandler = (state) => {
	state.assetDiskPath = null;
	state.assetDownloadedSize = 0;
	state.assetSize = 0;
	state.assetUrl = null;
};
