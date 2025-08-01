import { updateSFXWorker } from "@modules/core/sound/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { soundPlayStarted } from "./soundPlayStarted";

function* worker({ payload }: ReturnType<typeof soundPlayStarted>) {
	const { workerId, soundId } = payload;

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
