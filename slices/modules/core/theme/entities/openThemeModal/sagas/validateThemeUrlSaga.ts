import { setModalError } from "@modules/core/modal/shared/base/lib";
import {
	createPromptModalActionFilter,
	type promptConfirmed,
} from "@modules/core/modal/shared/prompt/lib";
import { isUrl } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { installThemeModalActionId } from "../config";

const filterAction = createPromptModalActionFilter({
	actionId: installThemeModalActionId,
});

function* worker({ payload }: ReturnType<typeof promptConfirmed>) {
	const { value } = payload;
	if (!isUrl(value)) {
		yield put(setModalError("modal.theme.error.invalidUrl"));
		return;
	}
	console.log("url is valid");
}

export function* validateThemeUrlSaga() {
	yield takeEvery(filterAction, worker);
}
