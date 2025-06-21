import { setBoardPartSaga } from "@modules/board/base/shared/lib/store/sagas/setBoardPartSaga";
import { spawn } from "redux-saga/effects";
import { changeBoardPropHistorySaga } from "./changeBoardPropHistorySaga";
import { changeBoardPropValueHistorySaga } from "./changeBoardPropValueHistorySaga";
import { changeBoardValuePartHistorySaga } from "./changeBoardValuePartHistorySaga";

export function* boardHistoryWatchChangeSaga() {
	yield spawn(setBoardPartSaga);
	yield spawn(changeBoardPropHistorySaga);
	yield spawn(changeBoardPropValueHistorySaga);
	yield spawn(changeBoardValuePartHistorySaga);
}
