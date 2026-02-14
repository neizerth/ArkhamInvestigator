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

	if (!nickname) {
		return;
	}

	zeroconf.unpublishService(nickname);
}

export function* stopTCPServerSaga() {
	yield takeEvery(stopTCPServer.match, worker);
}
