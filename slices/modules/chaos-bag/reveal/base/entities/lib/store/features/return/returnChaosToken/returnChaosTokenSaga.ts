import {
	removeChaosToken,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/entities/lib";
import { removeRevealedTokenId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { canRemoveChaosToken } from "../../../../logic";
import { chaosTokenReturned, returnChaosToken } from "./returnChaosToken";

function* worker({ payload }: ReturnType<typeof returnChaosToken>) {
	const { id } = payload;

	const itemSelector = selectChaosBagTokenById(id);
	const token: ReturnType<typeof itemSelector> = yield select(itemSelector);

	if (!token) {
		return;
	}

	yield put(removeRevealedTokenId(id));

	if (canRemoveChaosToken(token)) {
		yield put(
			removeChaosToken({
				id: token.id,
			}),
		);
	}

	yield put(
		chaosTokenReturned({
			token,
		}),
	);
}

export function* returnChaosTokenSaga() {
	yield takeEvery(returnChaosToken.match, worker);
}
