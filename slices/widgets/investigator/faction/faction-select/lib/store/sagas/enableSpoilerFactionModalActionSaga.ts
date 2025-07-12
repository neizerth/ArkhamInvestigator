import { enableSpoilerFactionModalActionId as actionId } from "../../../config";

import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { setFactionFilter } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createModalActionFilter({
	id: actionId,
});

function* worker() {
	yield put(setFactionFilter("spoiler"));
}

export function* enableSpoilerFactionModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
