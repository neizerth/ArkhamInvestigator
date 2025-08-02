import {
	updateSFXWorker,
	updateSoundQueueItem,
} from "@modules/core/sound/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { soundPlayStarted } from "./soundPlayStarted";

function* worker({ payload }: ReturnType<typeof soundPlayStarted>) {
	const { workerId, soundId, taskId } = payload;

	yield put(
		updateSoundQueueItem({
			id: taskId,
			data: {
				status: "playing",
			},
		}),
	);

	yield put(
		updateSFXWorker({
			id: workerId,
			data: {
				status: "playing",
				soundId,
			},
		}),
	);
}

export function* soundPlayStartedSaga() {
	yield takeEvery(soundPlayStarted.match, worker);
}
