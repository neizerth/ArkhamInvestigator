import type { AssetDownloaderHandler } from "@modules/core/assets/asset-downloader/shared/model";

export type InitAssetDownloadPayload = {
	url: string;
	size: number;
	diskPath: string;
};

export const handleInitAssetDownload: AssetDownloaderHandler<
	InitAssetDownloadPayload
> = (state, payload) => {
	state.assetUrl = payload.url;
	state.assetSize = payload.size;
	state.assetDownloadedSize = 0;
	state.assetDiskPath = payload.diskPath;
};
