import { spawn } from "redux-saga/effects";
import { notEnoughSpaceSaga } from "./notEnoughSpace/notEnoughSpaceSaga";
import { removeDirectorySaga } from "./removeDirectory/removeDirectorySaga";
import { unzipSaga } from "./unzip";

export function* diskEntitySaga() {
	yield spawn(notEnoughSpaceSaga);
	yield spawn(unzipSaga);
	yield spawn(removeDirectorySaga);
}
