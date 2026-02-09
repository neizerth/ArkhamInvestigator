import { clearChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import {
	setReferenceCardCode,
	setStoryCode,
	setStoryDifficultyId,
} from "@modules/stories/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { fillChaosBagDifficulty } from "../fillChaosBagDifficulty";
import { changeStory } from "./changeStory";

function* worker({ payload }: ReturnType<typeof changeStory>) {
	const { storyCode, referenceCardCode, difficultyId, fillChaosBag } = payload;

	yield put(clearChaosTokenValue());

	if (storyCode) {
		yield put(setStoryCode(storyCode));
	}

	if (referenceCardCode) {
		yield put(setReferenceCardCode(referenceCardCode));
	}

	if (difficultyId) {
		yield put(setStoryDifficultyId(difficultyId));
		if (fillChaosBag) {
			yield put(fillChaosBagDifficulty({ difficultyId }));
		}
	}
}

export function* changeStorySaga() {
	yield takeEvery(changeStory.match, worker);
}
