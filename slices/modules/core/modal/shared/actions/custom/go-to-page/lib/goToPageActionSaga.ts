import type { PayloadAction } from "@reduxjs/toolkit";
import { goToPage, replacePageTo } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { goToPageModalActionId } from "../config";
import type { GoToPageModalAction } from "../model";

type Action = PayloadAction<GoToPageModalAction>;

const filterAction = createModalActionFilter({
	id: goToPageModalActionId,
});

function* worker({ payload }: Action) {
	const { href, replace } = payload;

	if (replace) {
		yield put(replacePageTo(href));
		return;
	}

	yield put(goToPage(href));
}

export function* goToPageActionSaga() {
	yield takeEvery(filterAction, worker);
}
