import { put } from "redux-saga/effects";
import { playSound } from "../../entities/base/lib";
import type { SoundId } from "../../shared/model";

export const createSoundWorker = (soundId: SoundId) => {
	return function* worker() {
		yield put(playSound(soundId));
	};
};
