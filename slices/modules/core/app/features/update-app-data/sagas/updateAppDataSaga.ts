import { updateAppData } from "@modules/core/app/shared/lib";
import { setRules } from "@modules/mechanics/rules/base/shared/lib";
import { updateSignatureGroups } from "@modules/signature/entities/lib";
import { setStories } from "@modules/stories/shared/lib";
import { seconds } from "@shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { put, retry, takeEvery } from "redux-saga/effects";
import { getAppData } from "./getAppData";

function* worker({ payload }: ReturnType<typeof updateAppData>) {
	const { language } = payload;

	const maxTries = 3;
	const delayMs = seconds(1);

	const { data }: ReturnAwaited<typeof getAppData> = yield retry(
		maxTries,
		delayMs,
		getAppData,
		language,
	);

	const { groups, stories, rules } = data;

	yield put(updateSignatureGroups(groups));
	yield put(setRules(rules));
	yield put(setStories(stories));
}

export function* updateAppDataSaga() {
	yield takeEvery(updateAppData.match, worker);
}
