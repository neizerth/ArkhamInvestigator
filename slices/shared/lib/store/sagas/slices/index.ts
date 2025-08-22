import { spawn } from "redux-saga/effects";
import { featuresSaga } from "../../../../../features/sagas";
import { boardPageGroupSaga } from "../../../../../pages/board/sagas";
import { sharedSaga } from "./shared";
import { widgetsSaga } from "./widgets";

export function* slicesSaga() {
	yield spawn(sharedSaga);

	yield spawn(featuresSaga);
	yield spawn(widgetsSaga);
	yield spawn(boardPageGroupSaga);
}
