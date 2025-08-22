import { spawn } from "redux-saga/effects";
import { modulesSaga } from "../../../modules/sagas";
import { slicesSaga } from "../../../sagas";

export default function* rootSaga() {
	yield spawn(modulesSaga);
	yield spawn(slicesSaga);
}
