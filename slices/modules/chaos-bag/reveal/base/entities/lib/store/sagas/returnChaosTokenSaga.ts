import { selectChaosBagTokenById } from "@modules/chaos-bag/base/entities/lib";
import {
	removeChaosTokenInternal,
	removeRevealedTokenId,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { canRemoveChaosToken } from "../../logic";
import { returnChaosToken } from "../actions";

function* worker({ payload }: ReturnType<typeof returnChaosToken>) {
	const { id } = payload;

	const itemSelector = selectChaosBagTokenById(id);
	const token: ReturnType<typeof itemSelector> = yield select(itemSelector);

	if (!token) {
		return;
	}

	yield put(removeRevealedTokenId(id));

	if (!canRemoveChaosToken(token)) {
		return;
	}

	yield put(
		removeChaosTokenInternal({
			id: token.id,
		}),
	);
}

export function* returnChaosTokenSaga() {
	yield takeEvery(returnChaosToken.match, worker);
}
