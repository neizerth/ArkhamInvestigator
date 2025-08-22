import { router } from "expo-router";
import { takeEvery } from "redux-saga/effects";
import { goToPage } from "./goToPage";

function worker({ payload }: ReturnType<typeof goToPage>) {
	if (typeof payload === "string") {
		router.navigate(payload);
		return;
	}

	if ("replace" in payload) {
		const { replace, navigate } = router;
		const action = payload.replace ? replace : navigate;

		action.call(router, payload.href);
		return;
	}
}

export function* goToPageSaga() {
	yield takeEvery(goToPage.match, worker);
}
