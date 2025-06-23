import { spawn } from "redux-saga/effects";
import { changeBoardPartHistorySaga } from "./changeBoardPartHistorySaga";
import { changeBoardPropHistorySaga } from "./changeBoardPropHistorySaga";
import { changeBoardPropValueHistorySaga } from "./changeBoardPropValueHistorySaga";
import { changeBoardValuePartHistorySaga } from "./changeBoardValuePartHistorySaga";

export function* boardHistoryChangeSaga() {
	yield spawn(changeBoardPartHistorySaga);
	yield spawn(changeBoardPropHistorySaga);
	yield spawn(changeBoardPropValueHistorySaga);
	yield spawn(changeBoardValuePartHistorySaga);
}
