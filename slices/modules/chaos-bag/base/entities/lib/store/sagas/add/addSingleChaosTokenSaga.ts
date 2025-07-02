import { put, select, takeEvery } from "redux-saga/effects";
import { chaosToken } from "../../../../../shared/config";
import { addChaosTokenInternal } from "../../../../../shared/lib/store/chaosBag";
import { createChaosBagToken } from "../../../logic";
import {
	addChaosToken,
	cantAddSingleChaosToken,
	chaosTokenAdded,
	singleChaosTokenAdded,
} from "../../actions";
import { selectCanAddChaosToken } from "../../selectors";

function* worker({ payload }: ReturnType<typeof addChaosToken>) {
	const { type } = payload;

	const canAddSelector = selectCanAddChaosToken(type);

	const validation: ReturnType<typeof canAddSelector> =
		yield select(canAddSelector);

	if (!validation.canAdd) {
		yield put(
			cantAddSingleChaosToken({
				...payload,
				...validation,
			}),
		);
		return;
	}

	const token = createChaosBagToken({
		type,
		removable: chaosToken.types.removable.includes(type),
	});

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
