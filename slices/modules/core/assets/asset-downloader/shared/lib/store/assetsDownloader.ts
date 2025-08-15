import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./features/reducers";

export type AssetDownloaderState = {
	assetUrl: string | null;
	assetSize: number;
	assetDownloadedSize: number;
	assetDiskPath: string | null;
};

const initialState: AssetDownloaderState = {
	assetUrl: null,
	assetSize: 0,
	assetDownloadedSize: 0,
	assetDiskPath: null,
};

const state = createSliceState(initialState);

export const assetsLoader = createSlice({
	name: "assetDownloader",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setAssetDiskPath,
	setAssetDownloadedSize,
	setAssetSize,
	setAssetUrl,
	initAssetDownload,
	clearAssetDownload,
} = assetsLoader.actions;

export const {
	selectAssetDiskPath,
	selectAssetDownloadedSize,
	selectAssetSize,
	selectAssetUrl,
} = assetsLoader.selectors;

export default assetsLoader.reducer;
