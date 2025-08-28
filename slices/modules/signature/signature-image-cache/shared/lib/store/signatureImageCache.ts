import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { SignatureImageCacheItem } from "../../model";

const adapter = createEntityAdapter({
	selectId: (item: SignatureImageCacheItem) => item.id,
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});
const selectors = adapter.getSelectors();

const initialState = adapter.getInitialState();

export const signatureImageCache = createSlice({
	name: "signatureImageCache",
	initialState,
	reducers: {
		addSignatureCache: adapter.addOne,
		removeSignatureCache: adapter.removeOne,
		updateSignatureCache: adapter.updateOne,
	},
	selectors: {
		selectAllSignatureCache: selectors.selectAll,
		selectSignatureCacheById: selectors.selectById,
	},
});

export const { addSignatureCache, removeSignatureCache, updateSignatureCache } =
	signatureImageCache.actions;

export const { selectSignatureCacheById, selectAllSignatureCache } =
	signatureImageCache.selectors;

export default signatureImageCache.reducer;
