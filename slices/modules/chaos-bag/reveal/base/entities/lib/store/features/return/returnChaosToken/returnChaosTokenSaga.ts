import {
	removeChaosTokens,
	updateChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import {
	removeRevealedTokenId,
	selectRevealedTokenById,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { canRemoveChaosToken } from "../../../../logic";
import { chaosTokenReturned, returnChaosToken } from "./returnChaosToken";

function* worker({ payload }: ReturnType<typeof returnChaosToken>) {
	const { id, type } = payload;

	const tokenSelector = selectRevealedTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const { afterReveal, virtual } = token;

	yield put(removeRevealedTokenId(payload));

	if (canRemoveChaosToken(token)) {
		yield put(
			removeChaosTokens({
				removeType: "single",
				token,
			}),
		);
	}

	if (afterReveal?.type === "return" && afterReveal.count > 0) {
		yield put(
			updateChaosToken({
				id,
				data: {
					afterReveal: {
						type: "return",
						count: afterReveal.count - 1,
					},
				},
			}),
		);
	}

	if (virtual) {
		yield put(removeRevealedTokenId(payload));
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
