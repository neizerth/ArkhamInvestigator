import { put, select, takeEvery } from "redux-saga/effects";

import {
	chaosBagUpdated,
	selectChaosBagTokensByType,
} from "@modules/chaos-bag/base/shared/lib";
import { selectCanRemoveChaosTokenFromBag } from "../../../selectors/logic";
import { removeChaosToken } from "../removeChaosToken/removeChaosToken";
import {
	cantRemoveSingleChaosTokenByType,
	removeSingleChaosTokenByType,
	singleChaosTokenRemovedByType,
} from "./removeSingleChaosTokenByType";

function* worker({ payload }: ReturnType<typeof removeSingleChaosTokenByType>) {
	const { type, boardId } = payload;

	const canRemoveSelector = selectCanRemoveChaosTokenFromBag(type);

	const validation: ReturnType<typeof canRemoveSelector> =
		yield select(canRemoveSelector);

	if (!validation.canRemove) {
		yield put(
			cantRemoveSingleChaosTokenByType({
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
	yield put(chaosBagUpdated(payload));
}

export function* removeSingleChaosTokenByTypeSaga() {
	yield takeEvery(removeSingleChaosTokenByType.match, worker);
}
