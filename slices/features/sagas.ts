import { spawn } from "redux-saga/effects";
import { hideDescriptionSaga } from "./hide-description";

export function* featuresSaga() {
	yield spawn(hideDescriptionSaga);
}
