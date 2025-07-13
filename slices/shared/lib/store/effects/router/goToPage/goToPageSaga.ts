import { router } from "expo-router";
import { takeEvery } from "redux-saga/effects";
import { goToPage } from "./goToPage";

function worker({ payload }: ReturnType<typeof goToPage>) {
	router.navigate(payload);
}

export function* goToPageSaga() {
	yield takeEvery(goToPage.match, worker);
}
