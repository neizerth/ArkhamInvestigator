import images from "@assets/images";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

import * as reducers from "./features/reducers";

const assetImagesCount = images.length;

export type AssetsState = {
	assetImagesCount: number;
	assetImagesLoadedCount: number;
	assetImagesLoaded: boolean;
	fontsLoaded: boolean;
	assetsLoaded: boolean;
};

const initialState: AssetsState = {
	assetImagesCount,
	assetImagesLoadedCount: 0,
	assetImagesLoaded: false,
	fontsLoaded: false,
	assetsLoaded: false,
};

const state = createSliceState(initialState);

export const assets = createSlice({
	name: "assets",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setAssetImagesCount,
	setAssetImagesLoadedCount,
	setAssetImagesLoaded,
	setFontsLoaded,
	setAssetsLoaded,
	initAssetsInternal,
} = assets.actions;

export const {
	selectAssetImagesCount,
	selectAssetImagesLoadedCount,
	selectAssetImagesLoaded,
	selectFontsLoaded,
	selectAssetsLoaded,
} = assets.selectors;

export default assets.reducer;
