import { clearChaosBag } from "@modules/chaos-bag/base/entities/lib";
import { setUnlimitedChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!startNewGame.match(action)) {
		return false;
	}
	return action.payload.type === "multiplayer";
};

function* worker() {
	yield put(clearChaosBag());
	yield put(setUnlimitedChaosTokens(false));
}

export function* resetChaosBagOnMultiplayerSaga() {
	yield takeEvery(filterAction, worker);
}
