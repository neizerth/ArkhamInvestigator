import { goToPage } from "@modules/core/router/shared/lib";
import { Platform } from "react-native";
import { delay, put, select, take, takeEvery } from "redux-saga/effects";
import { descriptionHidden } from "../../entities/description/lib";
import { selectShowDescription, setShowDescription } from "../../shared/lib";
import { leaveBoard } from "./leaveBoard";

function* worker({ payload }: ReturnType<typeof leaveBoard>) {
	const show: ReturnType<typeof selectShowDescription> = yield select(
		selectShowDescription,
	);

	if (show) {
		yield put(setShowDescription(false));
		yield take(descriptionHidden.match);
	}

	// Fabric can throw "child already has a parent" if replace runs in the same
	// tick as layout updates from the description animation or screen teardown.
	if (Platform.OS === "android") {
		yield delay(50);
	}

	yield put(goToPage(payload));
}

export function* leaveBoardSaga() {
	yield takeEvery(leaveBoard.match, worker);
}
