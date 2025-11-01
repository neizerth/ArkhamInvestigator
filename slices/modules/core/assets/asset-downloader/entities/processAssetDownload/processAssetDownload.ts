import { createAction } from "@reduxjs/toolkit";
import type { InitAssetDownloadPayload } from "../../shared/lib";

export const processAssetDownload = createAction<InitAssetDownloadPayload>(
	"assetDownloader/processDownload",
);

export type AssetSuccessfullyDownloadedPayload = InitAssetDownloadPayload & {
	uri: string;
};

export type AssetDownloadErrorPayload = InitAssetDownloadPayload & {
	error: unknown;
};

export type AssetDownloadEndPayload = InitAssetDownloadPayload &
	(
		| {
				status: "error";
				error: unknown;
		  }
		| {
				status: "success";
				uri: string;
		  }
	);

export const assetDownloadEnd = createAction<AssetDownloadEndPayload>(
	"assetDownloader/end",
);
