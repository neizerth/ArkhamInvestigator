import {
	selectSignatureGroups,
	setSignatureGroups,
} from "@modules/signature/base/shared/lib";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { downloadSignatureImages } from "./downloadSignatureImages";
import { compareSignatureGroups } from "./lib/compareSignatureGroups";
import { updateSignatureGroups } from "./updateSignatureGroups";

function* worker({ payload }: ReturnType<typeof updateSignatureGroups>) {
	const previousGroups: ReturnType<typeof selectSignatureGroups> = yield select(
		selectSignatureGroups,
	);

	yield put(setSignatureGroups(payload));

	// the first groups come with the archive
	const changedIds = previousGroups?.length
		? compareSignatureGroups(previousGroups, payload)
		: [];

	yield call(downloadSignatureImages, {
		groups: payload,
		changedIds,
	});
}

export function* updateSignatureGroupsSaga() {
	yield takeEvery(updateSignatureGroups.match, worker);
}
