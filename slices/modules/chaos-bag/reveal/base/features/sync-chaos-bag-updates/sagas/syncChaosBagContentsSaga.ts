import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { syncRevealedValuesWithContents } from "../../../shared/lib";
import { syncChaosBagContents } from "../syncChaosBagContents";

function* worker({ payload }: ReturnType<typeof syncChaosBagContents>) {
	const { boardId } = payload;
	const contents: ReturnType<typeof selectChaosBagContents> = yield select(
		selectChaosBagContents,
	);

	const valuesSelector = selectChaosBagTokenValues(boardId);

	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);

	yield put(
		syncRevealedValuesWithContents({
			contents,
			values,
		}),
	);
}

export function* syncChaosBagContentsSaga() {
	yield takeEvery(syncChaosBagContents.match, worker);
}
