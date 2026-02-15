import {
	chaosBagUpdated,
	getChaosBagContentsByTokenCount,
	selectChaosBagTokenCount,
	selectChaosBagUpdatedAt,
	setChaosBagContents,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateChaosBag } from "./updateChaosBag";

function* worker({ payload }: ReturnType<typeof updateChaosBag>) {
	const tokenCount: ReturnType<typeof selectChaosBagTokenCount> = yield select(
		selectChaosBagTokenCount,
	);
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);
	const contents = getChaosBagContentsByTokenCount(tokenCount);
	yield put(
		setChaosBagContents({
			contents,
			lastUpdatedAt,
		}),
	);

	yield put(chaosBagUpdated(payload));
}
export function* updateChaosBagSaga() {
	yield takeEvery(updateChaosBag.match, worker);
}
