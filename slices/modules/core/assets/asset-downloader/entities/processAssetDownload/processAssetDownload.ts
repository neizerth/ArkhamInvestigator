import { createAction } from "@reduxjs/toolkit";
import type { InitAssetDownloadPayload } from "../../shared/lib";

export const processAssetDownload = createAction<InitAssetDownloadPayload>(
	"assetDownloader/processDownload",
);

export type AssetSuccessfullyDownloadedPayload = InitAssetDownloadPayload & {
	uri: string;
};

export const assetSuccessfullyDownloaded =
	createAction<AssetSuccessfullyDownloadedPayload>("assetDownloader/");
