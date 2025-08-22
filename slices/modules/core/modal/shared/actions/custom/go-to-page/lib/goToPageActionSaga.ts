import { put, takeEvery } from "redux-saga/effects";

import {
	type CreateModalActionFilterAction,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { goToPageModalActionId } from "../config";
import type { GoToPageModalAction } from "../model";

type Action = CreateModalActionFilterAction<GoToPageModalAction>;

const filterAction = createModalActionFilter({
	ids: [goToPageModalActionId],
});

function* worker({ payload }: Action) {
	const { modalAction } = payload;

	yield put(goToPage(modalAction));
}

export function* goToPageActionSaga() {
	yield takeEvery(filterAction, worker);
}
