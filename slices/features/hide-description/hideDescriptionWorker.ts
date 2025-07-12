import { setShowDescription } from "@shared/lib";
import { put } from "redux-saga/effects";

export function* hideDescriptionWorker() {
	yield put(setShowDescription(false));
}
