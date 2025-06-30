import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { chaosToken } from "../../../config";
import type { ChaosBagToken } from "../../../model";
import {
	addChaosToken,
	cantAddChaosToken,
	chaosTokenAdded,
	singleChaosTokenAdded,
} from "../actions";
import { addChaosTokenInternal } from "../chaosBag";
import { selectCanAddChaosToken } from "../selectors";

function* worker({ payload }: ReturnType<typeof addChaosToken>) {
	const { type } = payload;

	const canAddTokenSelector = selectCanAddChaosToken(type);

	const canAdd: ReturnType<typeof canAddTokenSelector> = yield select(
		selectCanAddChaosToken,
	);

	if (!canAdd) {
		yield put(cantAddChaosToken(payload));
		return;
	}

	const token: ChaosBagToken = {
		id: v4(),
		type,
		removable: chaosToken.types.removable.includes(type),
	};

	yield put(addChaosTokenInternal(token));

	yield put(
		chaosTokenAdded({
			...payload,
			token,
		}),
	);

	yield put(
		singleChaosTokenAdded({
			...payload,
			token,
		}),
	);
}

export function* addChaosTokenSaga() {
	yield takeEvery(addChaosToken.match, worker);
}
