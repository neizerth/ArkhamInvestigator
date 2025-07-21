import {
	getChaosBagContentsByTokenCount,
	selectChaosBagTokenCount,
	setChaosBagContents,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosBagUpdated, updateChaosBag } from "./updateChaosBag";

function* worker({ payload }: ReturnType<typeof updateChaosBag>) {
	const tokenCount: ReturnType<typeof selectChaosBagTokenCount> = yield select(
		selectChaosBagTokenCount,
	);
	const contents = getChaosBagContentsByTokenCount(tokenCount);
	yield put(setChaosBagContents(contents));

	yield put(
		chaosBagUpdated({
			...(payload || {}),
			contents,
		}),
	);
}
export function* updateChaosBagSaga() {
	yield takeEvery(updateChaosBag.match, worker);
}
