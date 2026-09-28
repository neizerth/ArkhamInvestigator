import { tcpLog } from "@modules/core/log/shared/config";
import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient";
import {
	connectNetworkClient,
	filterTCPIncomeAction,
	isPrivateIPv4,
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

	tcpLog.info("connecting TCP client", payload);

	const ip: ReturnType<typeof selectIP> = yield select(selectIP);

	// S5 (audit/multiplayer.md): a connecting client's self-reported hostIP is untrusted input —
	// it is the address the client happened to reach us on, not something we can verify. Only fall
	// back to it when we truly have no IP of our own (the hotspot case, where NetInfo has none),
	// and only when it looks like a plausible LAN address; a malformed or non-private value would
	// otherwise poison the invite code/QR the host shows to every other player.
	if (!ip && hostIP && isPrivateIPv4(hostIP)) {
		tcpLog.info("setting IP from hostIP", hostIP);
		yield put(setIP(hostIP));
	}

	yield call(setTCPClientSocket, networkId, socket);

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
