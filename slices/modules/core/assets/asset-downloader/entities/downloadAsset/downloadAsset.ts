import { createAction } from "@reduxjs/toolkit";
import type { InitAssetDownloadPayload } from "../../shared/lib";

export type DownloadAssetPayload = InitAssetDownloadPayload & {
	requiredSize: number;
};

export const downloadAsset = createAction<DownloadAssetPayload>(
	"assetDownloader/download",
);
