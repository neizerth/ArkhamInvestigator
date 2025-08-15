import { spawn } from "redux-saga/effects";
import { notEnoughSpaceSaga } from "./notEnoughSpace/notEnoughSpaceSaga";
import { unzipSaga } from "./unzip";

export function* diskEntitySaga() {
	yield spawn(notEnoughSpaceSaga);
	yield spawn(unzipSaga);
}
