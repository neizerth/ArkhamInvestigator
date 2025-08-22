import { spawn } from "redux-saga/effects";
import { featuresSaga } from "./features/sagas";
import { pagesSaga } from "./pages/sagas";

export function* slicesSaga() {
	yield spawn(featuresSaga);
	yield spawn(pagesSaga);
}
