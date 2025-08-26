import { setShowDescription } from "@modules/board/base/shared/lib";
import { SystemBars } from "react-native-edge-to-edge";
import { put, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

function* worker({ payload }: ReturnType<typeof setShowDescription>) {
	if (!payload) {
		yield put(setBoardSystemBar("current"));
		return;
	}

	SystemBars.setStyle("light");
}

export function* watchDescriptionShowSaga() {
	yield takeEvery(setShowDescription.match, worker);
}
