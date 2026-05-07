import { takeEvery } from "redux-saga/effects";
import { clearLogs } from "./clearLogs";

function* worker({ payload }: ReturnType<typeof clearLogs>) {
	console.log(payload);
	yield 1;
}

export function* clearLogsSaga() {
	yield takeEvery(clearLogs.match, worker);
}
