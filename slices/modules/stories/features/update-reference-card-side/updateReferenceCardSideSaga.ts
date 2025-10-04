import {
	isReferenceBackDifficultyId,
	setShowReferenceBackText,
	setStoryDifficultyId,
} from "@modules/stories/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof setStoryDifficultyId>) {
	if (!payload) {
		return;
	}
	const showBackText = isReferenceBackDifficultyId(payload);

	yield put(setShowReferenceBackText(showBackText));
}

export function* updateReferenceCardSideSaga() {
	yield takeEvery(setStoryDifficultyId.match, worker);
}
