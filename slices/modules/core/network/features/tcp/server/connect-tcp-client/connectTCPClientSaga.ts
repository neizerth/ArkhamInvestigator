import { log } from "@modules/core/log/shared/config";
import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient";
import {
	connectNetworkClient,
	filterTCPIncomeAction,
	selectIP,
	setIP,
	setTCPClientSocket,
	upsertNetworkClient,
} from "@modules/core/network/shared/lib";
import type { TCPIncomeReturnType } from "@modules/core/network/shared/model";
import { selectGameStatus } from "@modules/game/shared/lib";
import { startMultiplayerGame } from "@modules/multiplayer/entities/lib/store/features/startMultiplayerGame";
import { call, put, select, takeEvery } from "redux-saga/effects";

const filterAction = filterTCPIncomeAction(connectNetworkClient.match);

function* worker({
	meta,
	payload,
}: TCPIncomeReturnType<typeof connectNetworkClient>) {
	const { nickname, hostIP } = payload;
	const { networkId, socket } = meta;

	const ip: ReturnType<typeof selectIP> = yield select(selectIP);

	if (ip !== hostIP) {
		yield put(setIP(hostIP));
	}

	yield call(setTCPClientSocket, networkId, socket);

	log.info("connecting TCP client", payload);

	yield put(
		upsertNetworkClient({
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
