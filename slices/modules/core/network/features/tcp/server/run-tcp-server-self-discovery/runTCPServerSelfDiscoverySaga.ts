import { requestAndroidPermission } from "@modules/core/device/shared/lib/logic";
import { log } from "@modules/core/log/shared/config";
import { TCP_SERVICE_NAME } from "@modules/core/network/shared/config";
import {
	selectIP,
	selectNetworkType,
	selectNickname,
	setIP,
	setNetworkRole,
	type stopTCPServer,
} from "@modules/core/network/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import Zeroconf, { type Service } from "react-native-zeroconf";
import {
	call,
	delay,
	put,
	race,
	select,
	take,
	takeEvery,
} from "redux-saga/effects";

/**
 * Why: when the device is a hotspot host, NetInfo often reports `type: none` and does not
 * provide a usable local IP address. However, the TCP server is still reachable on the LAN.
 *
 * We publish the TCP server via Zeroconf and then "self-discover" it by scanning the same
 * service type. The discovered service carries the address(es) that other devices see in the
 * local network. We store that IP in Redux to power UI (QR/invite/diagnostics) and connection flows.
 */
function* worker({ payload }: ReturnType<typeof setNetworkRole>) {
	if (payload !== "host") {
		return;
	}
	const networkType: ReturnType<typeof selectNetworkType> =
		yield select(selectNetworkType);

	const ip: ReturnType<typeof selectIP> = yield select(selectIP);
	if (ip && networkType !== "none") {
		return;
	}

	if (networkType === "none") {
		yield put(setIP(null));
	}

	const access: ReturnAwaited<typeof requestAndroidPermission> = yield call(
		requestAndroidPermission,
		"ACCESS_FINE_LOCATION",
	);

	if (access && access !== "granted") {
		return;
	}

	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const zeroconf = new Zeroconf();
	zeroconf.scan(TCP_SERVICE_NAME);

	try {
		while (true) {
			const { stop }: { stop?: ReturnType<typeof stopTCPServer> } = yield race({
				tick: delay(1000),
				stop: take(setNetworkRole.match),
			});

			if (stop) {
				return;
			}

			const services = zeroconf.getServices();
			const self: Service | undefined = Object.values(services).find(
				(s) => s.name === nickname && s.addresses && s.addresses.length > 0,
			);

			const ip = self?.addresses?.[0];
			if (!ip) {
				continue;
			}

			const currentIP: ReturnType<typeof selectIP> = yield select(selectIP);
			if (currentIP !== ip) {
				log.info("tcp server self discovery: set ip", ip);
				yield put(setIP(ip));
			}
		}
	} finally {
		zeroconf.stop();
	}
}

export function* runTCPServerSelfDiscoverySaga() {
	yield takeEvery(setNetworkRole.match, worker);
}
