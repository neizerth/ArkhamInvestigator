import { range } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosToken } from "../../../../../shared/config";
import { addChaosTokenInternal } from "../../../../../shared/lib/store/chaosBag";
import { createChaosBagToken } from "../../../logic";
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

	const response: ReturnType<typeof canAddTokenSelector> =
		yield select(canAddTokenSelector);

	if (!response.canAdd) {
		yield put(
			cantAddMultipleChaosTokens({
				...payload,
				...response,
			}),
		);
		return;
	}

	const tokenData = {
		type,
		removable: chaosToken.types.removable.includes(type),
	};

	const createToken = () => createChaosBagToken(tokenData);

	const tokens = range(0, count).map(createToken);

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
