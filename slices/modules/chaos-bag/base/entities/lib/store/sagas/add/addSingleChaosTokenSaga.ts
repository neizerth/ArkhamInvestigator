import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { chaosToken } from "../../../../../shared/config";
import { addChaosTokenInternal } from "../../../../../shared/lib/store/chaosBag";
import type { ChaosBagToken } from "../../../../../shared/model";
import {
	addChaosToken,
	cantAddSingleChaosToken,
	chaosTokenAdded,
	singleChaosTokenAdded,
} from "../../actions";
import { selectCanAddChaosToken } from "../../selectors";

function* worker({ payload }: ReturnType<typeof addChaosToken>) {
	const { type } = payload;

	const canAddTokenSelector = selectCanAddChaosToken(type);

	const validation: ReturnType<typeof canAddTokenSelector> = yield select(
		selectCanAddChaosToken,
	);

	if (!validation.canAdd) {
		yield put(
			cantAddSingleChaosToken({
				...payload,
				...validation,
			}),
		);
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

export function* addSingleChaosTokenSaga() {
	yield takeEvery(addChaosToken.match, worker);
}
