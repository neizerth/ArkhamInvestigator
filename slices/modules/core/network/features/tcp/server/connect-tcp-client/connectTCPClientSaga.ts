import { sendTCPClientAction } from "@modules/core/network/entities/tcp/server/sendTCPClientAction";
import {
	connectNetworkClient,
	filterTCPIncomeAction,
	hasTCPClientSocket,
	setTCPClientSocket,
} from "@modules/core/network/shared/lib";
import { addNetworkClient } from "@modules/core/network/shared/lib/store/networkClient";
import type { TCPIncomeReturnType } from "@modules/core/network/shared/model";
import { selectGameStatus } from "@modules/game/shared/lib";
import { startMultiplayerGame } from "@modules/multiplayer/entities/lib/store/features/startMultiplayerGame";
import { call, put, select, takeEvery } from "redux-saga/effects";

const filterAction = filterTCPIncomeAction(connectNetworkClient.match);

function* worker({
	meta,
	payload,
}: TCPIncomeReturnType<typeof connectNetworkClient>) {
	console.log("connectTCPClientSaga", payload);
	const { nickname } = payload;
	const { networkId, socket } = meta;

	const exists = hasTCPClientSocket(networkId);

	yield call(setTCPClientSocket, networkId, socket);

	if (exists) {
		console.error("TCPClientSocket already exists");
		return;
	}

	console.log("connecting TCP client", payload);

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
		sendTCPClientAction({
			action: startMultiplayerGame(),
			type: "single",
			networkId,
		}),
	);
}

export function* connectTCPClientSaga() {
	yield takeEvery(filterAction, worker);
}
