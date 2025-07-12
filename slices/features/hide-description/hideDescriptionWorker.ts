import { setShowDescription } from "@shared/lib";
import { put } from "redux-saga/effects";

export function* hideDescriptionWorker() {
	console.log("hide!!!");
	yield put(setShowDescription(false));
}
