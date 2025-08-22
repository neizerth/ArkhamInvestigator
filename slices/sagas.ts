import { spawn } from "redux-saga/effects";
import { featuresSaga } from "./features/sagas";

export function* slicesSaga() {
	yield spawn(featuresSaga);
}
