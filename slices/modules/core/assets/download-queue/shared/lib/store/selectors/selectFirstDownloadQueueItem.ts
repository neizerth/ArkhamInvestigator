import { createSelector } from "@reduxjs/toolkit";
import { head } from "ramda";
import { selectDownloadQueue } from "../downloadQueue";

export const selectFirstDownloadQueueItem = createSelector(
	[selectDownloadQueue],
	head,
);
