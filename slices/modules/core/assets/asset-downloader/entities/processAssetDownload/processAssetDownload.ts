import { createAction } from "@reduxjs/toolkit";
import type { InitAssetDownloadPayload } from "../../shared/lib";

export const processAssetDownload = createAction<InitAssetDownloadPayload>(
	"assetDownloader/processDownload",
);

export type AssetSuccessfullyDownloadedPayload = InitAssetDownloadPayload & {
	uri: string;
};

export const assetDownloadComplete =
	createAction<AssetSuccessfullyDownloadedPayload>(
		"assetDownloader/downloadComplete",
	);

export type AssetDownloadErrorPayload = InitAssetDownloadPayload & {
	error: unknown;
};

export const assetDownloadError = createAction<AssetDownloadErrorPayload>(
	"assetDownloader/error",
);
