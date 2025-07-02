import { removeChaosTokenInternal } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	cantRemoveChaosToken,
	chaosTokenRemoved,
	removeChaosToken,
} from "../../actions";
import { selectChaosBagTokensByType } from "../../selectors";
import { selectCanRemoveChaosToken } from "../../selectors/logic/remove";

function* worker({ payload }: ReturnType<typeof removeChaosToken>) {
	const { type } = payload;

	const canRemoveSelector = selectCanRemoveChaosToken(type);

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
		removeChaosTokenInternal({
			id: token.id,
		}),
	);

	yield put(
		chaosTokenRemoved({
			...payload,
			token,
		}),
	);
}

// TODO
export function* removeSingleChaosTokenSaga() {
	yield takeEvery(removeChaosToken.match, worker);
}
