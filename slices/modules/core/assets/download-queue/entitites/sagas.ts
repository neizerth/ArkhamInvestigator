import { spawn } from "redux-saga/effects";
import { checkDownloadQueueSaga } from "./checkDownloadQueue";
import { processDownloadQueueItemSaga } from "./processDownloadQueueItem";

export function* downloadQueueEntitiesSaga() {
	yield spawn(checkDownloadQueueSaga);
	yield spawn(processDownloadQueueItemSaga);
}
