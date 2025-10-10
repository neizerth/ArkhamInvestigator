import { spawn } from "redux-saga/effects";
import { imageEntitiesSaga } from "./entities/sagas";

export function* imageSaga() {
	yield spawn(imageEntitiesSaga);
}
