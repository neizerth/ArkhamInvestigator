import {
	chaosBagUpdated,
	getChaosBagContentsByTokenCount,
	selectChaosBagUpdatedAt,
	setChaosBagContents,
	setChaosBagTokenCount,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosBagCreated, createChaosBag } from "./createChaosBag";

function* worker({ payload }: ReturnType<typeof createChaosBag>) {
	const { tokenCount } = payload;
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);
	const contents = getChaosBagContentsByTokenCount(tokenCount);

	yield put(
		setChaosBagContents({
			contents,
			lastUpdatedAt,
		}),
	);

	yield put(setChaosBagTokenCount(tokenCount));

	yield put(
		chaosBagCreated({
			...payload,
			contents,
		}),
	);

	yield put(chaosBagUpdated({}));
}
export function* createChaosBagSaga() {
	yield takeEvery(createChaosBag.match, worker);
}
