import { createChaosBagToken } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { addChaosTokenInternal } from "../../../../../../shared/lib/store/chaosBag";

import { selectCanAddChaosToken } from "../../../selectors";
import {
	addChaosToken,
	cantAddSingleChaosToken,
	chaosTokenAdded,
	singleChaosTokenAdded,
} from "./addSingleChaosToken";

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
