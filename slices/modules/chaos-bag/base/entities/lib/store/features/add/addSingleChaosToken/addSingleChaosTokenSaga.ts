import {
	chaosBagUpdated,
	createChaosBagToken,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	addChaosTokenInternal,
	selectChaosBagUpdatedAt,
} from "../../../../../../shared/lib/store/chaosBag";

import { selectCanAddChaosToken } from "../../../selectors";
import {
	addSingleChaosToken,
	cantAddSingleChaosToken,
	chaosTokenAdded,
	singleChaosTokenAdded,
} from "./addSingleChaosToken";

function* worker({ payload }: ReturnType<typeof addSingleChaosToken>) {
	const { type } = payload;
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);
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

	const token = createChaosBagToken(payload);

	yield put(
		addChaosTokenInternal({
			token,
			lastUpdatedAt,
		}),
	);

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

	yield put(chaosBagUpdated(payload));
}

export function* addSingleChaosTokenSaga() {
	yield takeEvery(addSingleChaosToken.match, worker);
}
