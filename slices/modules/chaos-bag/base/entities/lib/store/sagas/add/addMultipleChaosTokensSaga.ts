import { range } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { chaosToken } from "../../../../../shared/config";
import { addChaosTokenInternal } from "../../../../../shared/lib/store/chaosBag";
import type { ChaosBagToken } from "../../../../../shared/model";
import {
	addMultipleChaosTokens,
	cantAddMultipleChaosTokens,
	chaosTokenAdded,
	multipleChaosTokensAdded,
} from "../../actions";
import { selectCanAddMultipleChaosTokens } from "../../selectors";

function* worker({ payload }: ReturnType<typeof addMultipleChaosTokens>) {
	const { type, count } = payload;

	const canAddTokenSelector = selectCanAddMultipleChaosTokens({
		type,
		count,
	});

	const response: ReturnType<typeof canAddTokenSelector> = yield select(
		selectCanAddMultipleChaosTokens,
	);

	if (!response.canBeAdded) {
		yield put(
			cantAddMultipleChaosTokens({
				...payload,
				...response,
			}),
		);
		return;
	}

	const tokens = range(0, count).map(
		(): ChaosBagToken => ({
			id: v4(),
			type,
			removable: chaosToken.types.removable.includes(type),
		}),
	);

	for (const token of tokens) {
		yield put(addChaosTokenInternal(token));
		yield put(
			chaosTokenAdded({
				...payload,
				token,
			}),
		);
	}

	yield put(
		multipleChaosTokensAdded({
			...payload,
			tokens,
		}),
	);
}

export function* addMultipleChaosTokensSaga() {
	yield takeEvery(addMultipleChaosTokens.match, worker);
}
