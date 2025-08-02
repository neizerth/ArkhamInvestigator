import {
	removeSoundQueueItem,
	updateSFXWorker,
} from "@modules/core/sound/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { soundPlayEnd } from "./soundPlayEnd";

function* worker({ payload }: ReturnType<typeof soundPlayEnd>) {
	const { workerId, taskId } = payload;

	yield put(removeSoundQueueItem(taskId));

	yield put(
		updateSFXWorker({
			id: workerId,
			data: {
				status: "idle",
			},
		}),
	);
}

export function* soundPlayEndSaga() {
	yield takeEvery(soundPlayEnd.match, worker);
}
