import { goToPage } from "@modules/core/router/shared/lib";
import { setGameMode, setGameStatus } from "@modules/game/shared/lib";
import type { GameType } from "@modules/game/shared/model";
import { routes } from "@shared/config";
import type { Route } from "expo-router";
import { put, takeEvery } from "redux-saga/effects";
import { startNewGame } from "./startNewGame";

const routeMap: Record<GameType, Route> = {
	single: routes.selectInvestigators,
	multiplayer: routes.startMultiplayer,
};

function* worker({ payload }: ReturnType<typeof startNewGame>) {
	const { type } = payload;
	const route = routeMap[type];

	yield put(setGameMode(type));

	if (type === "single") {
		yield put(setGameStatus("selecting"));
		yield put(goToPage(routes.selectInvestigators));
		return;
	}

	yield put(setGameStatus("initial"));
	yield put(goToPage(route));
}

export function* startNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
