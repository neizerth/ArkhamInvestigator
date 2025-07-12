import { goToPage, replacePageTo } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

import {
	type CreateModalActionFilterAction,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import { goToPageModalActionId } from "../config";
import type { GoToPageModalAction } from "../model";

type Action = CreateModalActionFilterAction<GoToPageModalAction>;

const filterAction = createModalActionFilter({
	ids: [goToPageModalActionId],
});

function* worker({ payload }: Action) {
	const { href, replace } = payload.modalAction;

	if (replace) {
		yield put(replacePageTo(href));
		return;
	}

	yield put(goToPage(href));
}

export function* goToPageActionSaga() {
	yield takeEvery(filterAction, worker);
}
