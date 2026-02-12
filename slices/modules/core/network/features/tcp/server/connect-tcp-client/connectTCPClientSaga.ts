import { sendTCPActionToClient } from "@modules/core/network/entities/tcp/server/sendTCPActionToClient";
import {
	addNetworkClient,
	connectNetworkClient,
	filterTCPIncomeAction,
	setTCPClientSocket,
} from "@modules/core/network/shared/lib";
import type { TCPIncomeReturnType } from "@modules/core/network/shared/model";
import { selectGameStatus } from "@modules/game/shared/lib";
import { startMultiplayerGame } from "@modules/multiplayer/entities/lib/store/features/startMultiplayerGame";
import { log } from "@shared/config";
import { call, put, select, takeEvery } from "redux-saga/effects";

const filterAction = filterTCPIncomeAction(connectNetworkClient.match);

function* worker({
	meta,
	payload,
}: TCPIncomeReturnType<typeof connectNetworkClient>) {
	const { nickname } = payload;
	const { networkId, socket } = meta;

	yield call(setTCPClientSocket, networkId, socket);

	log.info("connecting TCP client", payload);

	yield put(
		addNetworkClient({
			id: networkId,
			nickname,
		}),
	);

	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);

	if (gameStatus !== "selecting") {
		return;
	}

	yield put(
		sendTCPActionToClient({
			action: startMultiplayerGame(),
			type: "single",
			networkId,
		}),
	);
}

export function* connectTCPClientSaga() {
	yield takeEvery(filterAction, worker);
}
