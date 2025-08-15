import { createAction } from "@reduxjs/toolkit";
import type { InitAssetDownloadPayload } from "../../shared/lib";

export const downloadAsset = createAction<InitAssetDownloadPayload>(
	"assetDownloader/download",
);
