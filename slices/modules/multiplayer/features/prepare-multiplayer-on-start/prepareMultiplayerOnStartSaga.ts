import {
	selectChaosBagUpdatedAt,
	setChaosBagContents,
	setUnlimitedChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { setStoryCode } from "@modules/stories/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!startNewGame.match(action)) {
		return false;
	}
	return action.payload.type === "multiplayer";
};

function* worker() {
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);

	yield put(setUnlimitedChaosTokens(false));
	yield put(
		setChaosBagContents({
			contents: [],
			lastUpdatedAt,
		}),
	);
	yield put(setStoryCode(null));
}

export function* prepareMultiplayerOnStartSaga() {
	yield takeEvery(filterAction, worker);
}
