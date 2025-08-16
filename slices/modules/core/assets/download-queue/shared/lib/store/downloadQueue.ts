import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import type { DownloadQueueItem } from "../../model";

const downloadQueueAdapter = createEntityAdapter({
	selectId: (item: DownloadQueueItem) => item.id,
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = downloadQueueAdapter.getInitialState();

export const downloadQueue = createSlice({
	name: "downloadQueue",
	initialState,
	reducers: {
		addManyDownloadQueueItems: downloadQueueAdapter.addMany,
		addDownloadQueueItem: downloadQueueAdapter.addOne,
		removeDownloadQueueItemById: downloadQueueAdapter.removeOne,
		setDownloadQueue: downloadQueueAdapter.setAll,
	},
});

export const {
	addDownloadQueueItem,
	removeDownloadQueueItemById,
	setDownloadQueue,
	addManyDownloadQueueItems,
} = downloadQueue.actions;

const downloadQueueSelectors = downloadQueueAdapter.getSelectors(
	(state: RootState) => state.downloadQueue,
);

export const selectDownloadQueue = downloadQueueSelectors.selectAll;
export const selectDownloadQueueSize = downloadQueueSelectors.selectTotal;

export default downloadQueue.reducer;
