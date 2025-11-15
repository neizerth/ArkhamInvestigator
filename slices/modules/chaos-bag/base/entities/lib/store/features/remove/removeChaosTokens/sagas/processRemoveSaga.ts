import { put, takeEvery } from "redux-saga/effects";
import {
	removeAllChaosTokensByType,
	removeChaosTokenByType,
	removeMultipleChaosTokensByType,
	removeSingleChaosToken,
} from "../../features";
import {
	chaosTokensRemoved,
	processChaosTokenRemove,
} from "../removeChaosTokens";

function* worker({ payload }: ReturnType<typeof processChaosTokenRemove>) {
	switch (payload.removeType) {
		case "all": {
			yield put(removeAllChaosTokensByType(payload));
			break;
		}
		case "single": {
			yield put(removeSingleChaosToken(payload));
			break;
		}
		case "type": {
			yield put(removeChaosTokenByType(payload));
			break;
		}
		case "multiple": {
			yield put(removeMultipleChaosTokensByType(payload));
			break;
		}
	}
	yield put(chaosTokensRemoved(payload));
}

export function* processChaosTokenRemoveSaga() {
	yield takeEvery(processChaosTokenRemove.match, worker);
}
