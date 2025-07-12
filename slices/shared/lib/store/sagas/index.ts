import { spawn } from "redux-saga/effects";
import { modulesSaga } from "./modules";
import { slicesSaga } from "./slices";

export default function* rootSaga() {
	yield spawn(modulesSaga);
	yield spawn(slicesSaga);
}
