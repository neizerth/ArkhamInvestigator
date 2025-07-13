import { router } from "expo-router";
import { takeEvery } from "redux-saga/effects";
import { replacePageTo } from "./replacePageTo";

function worker({ payload }: ReturnType<typeof replacePageTo>) {
	router.replace(payload);
}

export function* replacePageToSaga() {
	yield takeEvery(replacePageTo.match, worker);
}
