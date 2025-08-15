import type { AssetDownloaderReducer } from "@modules/core/assets/asset-downloader/shared/model";
import {
	type InitAssetDownloadPayload,
	handleInitAssetDownload,
} from "./handleInitAssetDownload";

export const initAssetDownloadReducer: AssetDownloaderReducer<
	InitAssetDownloadPayload
> = (state, { payload }) => {
	handleInitAssetDownload(state, payload);
};
