import { goToPage } from "@modules/core/router/shared/lib";
import { put, select, take, takeEvery } from "redux-saga/effects";
import {
	descriptionHidden,
	selectShowDescription,
	setShowDescription,
} from "../../shared/lib";
import { leaveBoard } from "./leaveBoard";

function* worker({ payload }: ReturnType<typeof leaveBoard>) {
	const show: ReturnType<typeof selectShowDescription> = yield select(
		selectShowDescription,
	);

	if (show) {
		yield put(setShowDescription(false));
		yield take(descriptionHidden.match);
	}

	yield put(goToPage(payload));
}

export function* leaveBoardSaga() {
	yield takeEvery(leaveBoard.match, worker);
}
