import { spawn } from "redux-saga/effects";
import { featuresSaga } from "./features";
import { widgetsSaga } from "./widgets";

export function* slicesSaga() {
	yield spawn(featuresSaga);
	yield spawn(widgetsSaga);
}
