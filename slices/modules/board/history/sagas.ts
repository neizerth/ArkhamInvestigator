import { spawn } from "redux-saga/effects";
import { boardHistorySharedSaga } from "./shared/lib/store/sagas";

export function* boardHistorySaga() {
	yield spawn(boardHistorySharedSaga);
}
