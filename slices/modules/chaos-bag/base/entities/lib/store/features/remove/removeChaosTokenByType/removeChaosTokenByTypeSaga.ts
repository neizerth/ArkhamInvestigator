import { put, select, takeEvery } from "redux-saga/effects";

import { selectChaosBagTokensByType } from "../../../selectors";
import { selectCanRemoveChaosTokenFromBag } from "../../../selectors/logic";
import { removeChaosToken } from "../removeChaosToken/removeChaosToken";
import {
	cantRemoveChaosToken,
	removeChaosTokenByType,
	singleChaosTokenRemovedByType,
} from "./removeChaosTokenByType";

function* worker({ payload }: ReturnType<typeof removeChaosTokenByType>) {
	const { type, boardId } = payload;

	const canRemoveSelector = selectCanRemoveChaosTokenFromBag(type);

	const validation: ReturnType<typeof canRemoveSelector> =
		yield select(canRemoveSelector);

	if (!validation.canRemove) {
		yield put(
			cantRemoveChaosToken({
				...payload,
				...validation,
			}),
		);
		return;
	}

	const tokenSelector = selectChaosBagTokensByType(type);

	const [token]: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	yield put(
		removeChaosToken({
			boardId,
			id: token.id,
		}),
	);

	yield put(singleChaosTokenRemovedByType(payload));
}

export function* removeChaosTokenByTypeSaga() {
	yield takeEvery(removeChaosTokenByType.match, worker);
}
