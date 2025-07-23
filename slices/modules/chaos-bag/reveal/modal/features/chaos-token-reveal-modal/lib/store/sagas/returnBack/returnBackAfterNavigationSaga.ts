import { routeChanged } from "@shared/lib";
import { takeEvery } from "redux-saga/effects";
import { canDisplayChaosTokenRevealModal as canDisplay } from "../../../logic";
import { openModalIfPossible } from "./openModalIfPossible";

function* worker({ payload }: ReturnType<typeof routeChanged>) {
	const display = canDisplay(payload);
	if (!display) {
		return false;
	}
	yield openModalIfPossible();
}

export function* returnBackAfterNavigationSaga() {
	yield takeEvery(routeChanged.match, worker);
}
