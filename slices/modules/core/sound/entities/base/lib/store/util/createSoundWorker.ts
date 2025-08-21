import type { SoundId } from "@modules/core/sound/shared/model";
import { put } from "redux-saga/effects";
import { playSound } from "../features";

export const createSoundWorker = (soundId: SoundId) => {
	return function* worker() {
		yield put(playSound(soundId));
	};
};
