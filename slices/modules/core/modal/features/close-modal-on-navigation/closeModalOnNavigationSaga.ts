import { goBack, goToPage } from "@modules/core/router/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { closeModal } from "../../shared/base/lib";

function* worker() {
	yield put(
		closeModal({
			source: "effect",
		}),
	);
}

export function* closeModalOnNavigationSaga() {
	yield takeEvery(goBack.match, worker);
	yield takeEvery(goToPage.match, worker);
}
