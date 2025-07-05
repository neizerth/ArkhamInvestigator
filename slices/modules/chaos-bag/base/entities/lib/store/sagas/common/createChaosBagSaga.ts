import {
	getChaosBagContentsByTokenCount,
	setChaosBagContents,
	setChaosBagTokenCount,
} from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { chaosBagCreated, createChaosBag } from "../../actions";

function* worker({ payload }: ReturnType<typeof createChaosBag>) {
	const { tokenCount } = payload;
	const contents = getChaosBagContentsByTokenCount(tokenCount);
	yield put(setChaosBagContents(contents));
	yield put(setChaosBagTokenCount(tokenCount));

	yield put(
		chaosBagCreated({
			...payload,
			contents,
		}),
	);
}
export function* createChaosBagSaga() {
	yield takeEvery(createChaosBag.match, worker);
}
