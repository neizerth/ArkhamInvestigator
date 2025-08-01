import {
	addSoundQueueItem,
	selectIdleSFXWorkers,
	selectSoundEnabled,
} from "@modules/core/sound/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { playSound } from "./playSound";

function* worker(action: ReturnType<typeof playSound>) {
	const enabled: ReturnType<typeof selectSoundEnabled> =
		yield select(selectSoundEnabled);

	if (!enabled) {
		return;
	}

	const soundId = action.payload;

	const workers: ReturnType<typeof selectIdleSFXWorkers> =
		yield select(selectIdleSFXWorkers);

	if (workers.length === 0) {
		return;
	}

	const [worker] = workers;

	yield put(
		addSoundQueueItem({
			id: v4(),
			workerId: worker.id,
			status: "idle",
			soundId,
		}),
	);
}

export function* playSoundSaga() {
	yield takeEvery(playSound.match, worker);
}
