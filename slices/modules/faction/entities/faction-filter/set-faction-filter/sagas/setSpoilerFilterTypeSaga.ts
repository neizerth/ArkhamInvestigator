import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { setFactionFilter } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalActionId } from "../config";

const filterAction = createModalActionFilter({
	ids: [modalActionId],
});

function* worker() {
	yield put(setFactionFilter("spoiler"));
}

export function* setSpoilerFilterTypeSaga() {
	yield takeEvery(filterAction, worker);
}
