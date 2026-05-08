import { TCP_SERVER_NAME } from "@modules/core/network/shared/config";
import {
	selectNickname,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import Zeroconf from "react-native-zeroconf";
import { select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof stopTCPServer>) {
	const zeroconf = new Zeroconf();
	const { name } = payload;

	if (name) {
		zeroconf.unpublishService(name);
		return;
	}

	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const nicknameTrimmed = nickname?.trim() ?? "";
	if (nicknameTrimmed) {
		zeroconf.unpublishService(nicknameTrimmed);
	}

	// If server was started before nickname was set (or nickname is empty),
	// the advertised name falls back to TCP_SERVER_NAME.
	if (nicknameTrimmed !== TCP_SERVER_NAME) {
		zeroconf.unpublishService(TCP_SERVER_NAME);
	}
}

export function* stopTCPServerSaga() {
	yield takeEvery(stopTCPServer.match, worker);
}
