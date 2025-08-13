import { setBackgroundColorAsync } from "expo-system-ui";
import { call, put, takeEvery } from "redux-saga/effects";
import { backgroundColorSet, setBackgroundColor } from "./setBackgroundColor";

function* worker({ payload }: ReturnType<typeof setBackgroundColor>) {
	yield call(setBackgroundColorAsync, payload);
	yield put(backgroundColorSet(payload));
}

export function* setBackgroundColorSaga() {
	yield takeEvery(setBackgroundColor.match, worker);
}
