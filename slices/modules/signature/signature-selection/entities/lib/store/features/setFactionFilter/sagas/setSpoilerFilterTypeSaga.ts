import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalActionId } from "../config";
import { setFactionFilter } from "../setFactionFilter";

const filterAction = createModalActionFilter({
	ids: [modalActionId],
});

function* worker() {
	yield put(setFactionFilter("spoiler"));
}

export function* setSpoilerFilterTypeSaga() {
	yield takeEvery(filterAction, worker);
}
