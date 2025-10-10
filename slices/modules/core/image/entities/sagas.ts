import { spawn } from "redux-saga/effects";
import { createGrayscaleImageSaga } from "./createGrayscaleImage/createGrayscaleImageSaga";

export function* imageEntitiesSaga() {
	yield spawn(createGrayscaleImageSaga);
}
