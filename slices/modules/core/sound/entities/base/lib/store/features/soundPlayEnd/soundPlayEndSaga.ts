import { takeEvery } from "redux-saga/effects";
import { soundPlayEnd } from "./soundPlayEnd";

function* worker({ payload }: ReturnType<typeof soundPlayEnd>) {}

export function* soundPlayEndSaga() {
	yield takeEvery(soundPlayEnd.match, worker);
}
