import { removeChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import {
	removeRevealedTokenId,
	selectRevealedTokenById,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { canRemoveChaosToken } from "../../../../logic";
import { chaosTokenReturned, returnChaosToken } from "./returnChaosToken";

function* worker({ payload }: ReturnType<typeof returnChaosToken>) {
	const { id } = payload;

	const tokenSelector = selectRevealedTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	yield put(removeRevealedTokenId(id));

	if (canRemoveChaosToken(token)) {
		yield put(
			removeChaosTokens({
				removeType: "single",
				token,
			}),
		);
	}

	if (token.virtual) {
		yield put(removeRevealedTokenId(id));
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
