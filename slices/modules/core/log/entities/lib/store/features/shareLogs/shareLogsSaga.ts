import { takeEvery } from "redux-saga/effects";
import { shareLogs } from "./shareLogs";

function* worker({ payload }: ReturnType<typeof shareLogs>) {
	// TODO: Implement share logs
}

export function* shareLogsSaga() {
	yield takeEvery(shareLogs.match, worker);
}
