import { SOUND_VOLUME_MODIFIER } from "@modules/core/sound/shared/config";
import {
	selectSoundEnabled,
	selectSoundVolume,
} from "@modules/core/sound/shared/lib";
import { playSoundById } from "@modules/core/sound/shared/lib";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { playSound, soundPlayEnd } from "./playSound";

function* worker({ payload }: ReturnType<typeof playSound>) {
	const enabled: ReturnType<typeof selectSoundEnabled> =
		yield select(selectSoundEnabled);

	if (!enabled) {
		return;
	}

	const soundVolume: ReturnType<typeof selectSoundVolume> =
		yield select(selectSoundVolume);

	const volume = soundVolume * SOUND_VOLUME_MODIFIER;

	yield call(playSoundById, {
		soundId: payload,
		volume,
	});

	yield put(soundPlayEnd(payload));
}

export function* playSoundSaga() {
	yield takeEvery(playSound.match, worker);
}
