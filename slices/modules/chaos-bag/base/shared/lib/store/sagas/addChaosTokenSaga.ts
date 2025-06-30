import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { chaosToken } from "../../../config";
import type { ChaosBagToken } from "../../../model";
import { canAddChaosToken } from "../../logic";
import { addChaosToken, cantAddChaosToken, chaosTokenAdded } from "../actions";
import {
	addChaosTokenInternal,
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../chaosBag";

function* worker({ payload }: ReturnType<typeof addChaosToken>) {
	const { type } = payload;

	const unlimitedChaosTokens: ReturnType<typeof selectUnlimitedChaosTokens> =
		yield select(selectUnlimitedChaosTokens);

	const tokenCount: ReturnType<typeof selectChaosBagTokenCount> = yield select(
		selectChaosBagTokenCount,
	);

	const canAdd = canAddChaosToken({
		type,
		unlimitedChaosTokens,
		tokenCount,
	});

	if (!canAdd) {
		yield put(cantAddChaosToken(payload));
		return;
	}

	const token: ChaosBagToken = {
		id: v4(),
		type,
		removable: chaosToken.types.removable.includes(type),
	};

	yield addChaosTokenInternal(token);

	yield chaosTokenAdded({
		...payload,
		token,
	});
}

export function* addChaosTokenSaga() {
	yield takeEvery(addChaosToken.match, worker);
}
