import { createAction } from "@reduxjs/toolkit";
import type { DownloadQueueItem } from "../../shared/model";

export const processDownloadQueueItem = createAction<DownloadQueueItem>(
	"downloadQueue/processItem",
);

type DownloadQueueItemSuccessPayload = DownloadQueueItem & {
	uri: string;
};

export const downloadQueueItemSuccess =
	createAction<DownloadQueueItemSuccessPayload>(
		"downloadQueue/downloadSuccess",
	);

export type DownloadQueueItemFailedPayload = DownloadQueueItem & {
	error: unknown;
};

export const downloadQueueItemFailed =
	createAction<DownloadQueueItemFailedPayload>("downloadQueue/downloadfailed");
