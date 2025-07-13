import {
	addChaosTokenInternal,
	createChaosBagToken,
} from "@modules/chaos-bag/base/shared/lib";
import { range } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanAddMultipleChaosTokens } from "../../../selectors";
import { chaosTokenAdded } from "../addSingleChaosToken";
import {
	addMultipleChaosTokens,
	cantAddMultipleChaosTokens,
	multipleChaosTokensAdded,
} from "./addMultipleChaosTokens";

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

	const createToken = () =>
		createChaosBagToken({
			type,
		});

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
