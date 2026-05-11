import { requestAndroidPermission } from "@modules/core/device/shared/lib/logic";
import { log } from "@modules/core/log/shared/config";
import {
	TCP_SERVER_NAME,
	TCP_SERVICE_NAME,
} from "@modules/core/network/shared/config";
import {
	restartTCPServer,
	selectHotspotEnabled,
	selectIP,
	selectNetworkType,
	selectNickname,
	setHotspotEnabled,
	setIP,
	setNetworkRole,
	stopTCPServer,
	tcpServerError,
	tcpServerListening,
} from "@modules/core/network/shared/lib";
import { createPageVisitFilter } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import type { ReturnAwaited } from "@shared/model";
import Zeroconf, { type Service } from "react-native-zeroconf";
import {
	call,
	delay,
	put,
	race,
	select,
	take,
	takeLatest,
} from "redux-saga/effects";

const SELF_DISCOVERY_TIMEOUT_MS = 5000;
const RESTART_COOLDOWN_MS = 15000;

/**
 * Why: when the device is a hotspot host, NetInfo often reports `type: none` and does not
 * provide a usable local IP address. However, the TCP server is still reachable on the LAN.
 *
 * We publish the TCP server via Zeroconf and then "self-discover" it by scanning the same
 * service type. The discovered service carries the address(es) that other devices see in the
 * local network. We store that IP in Redux to power UI (QR/invite/diagnostics) and connection flows.
 */
function* worker() {
	const networkType: ReturnType<typeof selectNetworkType> =
		yield select(selectNetworkType);

	const currentIP: ReturnType<typeof selectIP> = yield select(selectIP);

	if (networkType === "none" && currentIP) {
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
	const nicknameTrimmed = nickname?.trim() ?? "";
	const expectedNames = nicknameTrimmed
		? [nicknameTrimmed, TCP_SERVER_NAME]
		: [TCP_SERVER_NAME];

	let zeroconf = new Zeroconf();
	zeroconf.scan(TCP_SERVICE_NAME);
	let lastSeenAt = Date.now();
	let restarting = false;
	let lastRestartAt = 0;

	try {
		while (true) {
			const {
				tick,
				stop,
				role,
			}: {
				tick?: true;
				stop?: ReturnType<typeof stopTCPServer>;
				role?: ReturnType<typeof setNetworkRole>;
			} = yield race({
				tick: delay(1000, true),
				stop: take(stopTCPServer.match),
				role: take(setNetworkRole.match),
			});

			if (role && role.payload !== "host") {
				return;
			}

			if (stop) {
				if (restarting) {
					restarting = false;
				} else {
					return;
				}
			}

			if (!tick) {
				continue;
			}

			const services = zeroconf.getServices();
			const self: Service | undefined = Object.values(services).find(
				(s) =>
					expectedNames.includes(s.name) &&
					s.addresses &&
					s.addresses.length > 0,
			);

			const ip = self?.addresses?.[0];
			if (ip) {
				lastSeenAt = Date.now();

				const currentIP: ReturnType<typeof selectIP> = yield select(selectIP);
				if (currentIP !== ip) {
					log.info("tcp server self discovery: set ip", ip);
					yield put(setIP(ip));
					yield put(setHotspotEnabled(true));
				}
			}

			if (Date.now() - lastSeenAt < SELF_DISCOVERY_TIMEOUT_MS) {
				continue;
			}

			// If we cannot discover ourselves for a while, assume hotspot/LAN is unavailable.
			const currentIP: ReturnType<typeof selectIP> = yield select(selectIP);
			if (currentIP) {
				yield put(setIP(null));
			}
			const hotspotEnabled: ReturnType<typeof selectHotspotEnabled> =
				yield select(selectHotspotEnabled);
			if (hotspotEnabled) {
				yield put(setHotspotEnabled(false));
			}

			zeroconf.stop();
			zeroconf = new Zeroconf();
			zeroconf.scan(TCP_SERVICE_NAME);

			// Avoid restart loops (hotspot can be disabled and NetInfo won't emit changes).
			// Also avoid overlapping restarts, which can lead to EADDRINUSE.
			const now = Date.now();
			if (restarting || now - lastRestartAt < RESTART_COOLDOWN_MS) {
				lastSeenAt = now;
				continue;
			}

			log.warn("tcp server self discovery: timeout, restarting server");
			lastRestartAt = now;
			restarting = true;
			lastSeenAt = now;

			yield put(restartTCPServer());

			// Wait for restart to either listen again or fail; prevents overlapping restarts.
			yield race({
				listening: take(tcpServerListening.match),
				error: take(tcpServerError.match),
				timeout: delay(3000),
				stop: take(stopTCPServer.match),
			});

			restarting = false;
		}
	} finally {
		zeroconf.stop();
	}
}

const filterHostRoleAction = (action: unknown) => {
	if (!setNetworkRole.match(action)) {
		return false;
	}
	return action.payload === "host";
};

const onMultiplayerStartPageVisit = createPageVisitFilter(
	routes.startMultiplayer,
);

/** One watcher only — two `takeLatest` forks ran two Zeroconf loops and could restart TCP concurrently. */
const shouldRunSelfDiscovery = (action: unknown) =>
	filterHostRoleAction(action) || onMultiplayerStartPageVisit(action);

export function* runTCPServerSelfDiscoverySaga() {
	yield takeLatest(shouldRunSelfDiscovery, worker);
}
