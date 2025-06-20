import { changeBoardPartSaga } from "@modules/board/base/shared/lib/store/sagas/changeBoardPartSaga";
import { spawn } from "redux-saga/effects";
import { watchChangeBoardPropHistorySaga } from "./changeBoardPropHistorySaga";
import { watchChangeBoardPropValueHistorySaga } from "./changeBoardPropValueHistorySaga";
import { watchChangeBoardValuePartHistorySaga } from "./changeBoardValuePartHistorySaga";

export function* boardHistoryWatchChangeSaga() {
	yield spawn(changeBoardPartSaga);
	yield spawn(watchChangeBoardPropHistorySaga);
	yield spawn(watchChangeBoardPropValueHistorySaga);
	yield spawn(watchChangeBoardValuePartHistorySaga);
}
