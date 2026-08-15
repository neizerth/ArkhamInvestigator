import Zeroconf, { type Service } from "react-native-zeroconf";
import { TCP_PORT, TCP_SERVICE_NAME } from "../../config";

/**
 * One Zeroconf instance for the whole app.
 *
 * Why: every `new Zeroconf()` registers its own `DeviceEventEmitter` listeners and keeps a private
 * service map, so instances leak listeners and each sees only what its own scan resolved. Worse,
 * `scan()` clears that map and discovery is asynchronous — the old `new Zeroconf(); scan(); getServices()`
 * helpers always read an empty map, which made unpublishing a no-op and left stale hosts in the list.
 */
let instance: Zeroconf | null = null;
let scanRefCount = 0;
/** Name we published for this device — the only reliable handle for unpublishing. */
let publishedName: string | null = null;

export const getZeroconf = (): Zeroconf => {
	if (!instance) {
		instance = new Zeroconf();
	}
	return instance;
};

/**
 * Starts the shared scan (idempotent) and registers one holder. Every caller must pair this with
 * {@link releaseZeroconfScan} so the scan survives while any other consumer still needs it.
 */
export const acquireZeroconfScan = (): Zeroconf => {
	const zeroconf = getZeroconf();
	if (scanRefCount === 0) {
		zeroconf.scan(TCP_SERVICE_NAME);
	}
	scanRefCount++;
	return zeroconf;
};

export const releaseZeroconfScan = () => {
	if (scanRefCount === 0) {
		return;
	}
	scanRefCount--;
	if (scanRefCount === 0) {
		getZeroconf().stop();
	}
};

/** Re-runs discovery from scratch (clears resolved services) without dropping holders. */
export const restartZeroconfScan = () => {
	const zeroconf = getZeroconf();
	if (scanRefCount === 0) {
		return zeroconf;
	}
	zeroconf.stop();
	zeroconf.scan(TCP_SERVICE_NAME);
	return zeroconf;
};

/** Services resolved so far by the shared scan. Empty unless a scan is currently held. */
export const getZeroconfServices = (): Service[] => {
	return Object.values(getZeroconf().getServices());
};

export const publishZeroconfService = ({
	name,
	networkId,
}: { name: string; networkId: string }) => {
	const zeroconf = getZeroconf();

	if (publishedName && publishedName !== name) {
		zeroconf.unpublishService(publishedName);
	}

	for (const service of getZeroconfServices()) {
		if (service.txt?.networkId === networkId && service.name !== name) {
			zeroconf.unpublishService(service.name);
		}
	}

	publishedName = name;
	zeroconf.publishService(TCP_SERVICE_NAME, "tcp", "local.", name, TCP_PORT, {
		networkId,
	});
};

export const unpublishZeroconfServiceByName = (name: string) => {
	getZeroconf().unpublishService(name);
	if (publishedName === name) {
		publishedName = null;
	}
};

export const unpublishZeroconfServiceByNetworkId = (networkId: string) => {
	const zeroconf = getZeroconf();

	// Our own registration is tracked locally: discovery may not have resolved it back to us yet.
	if (publishedName) {
		zeroconf.unpublishService(publishedName);
		publishedName = null;
	}

	for (const service of getZeroconfServices()) {
		if (service.txt?.networkId === networkId) {
			zeroconf.unpublishService(service.name);
		}
	}
};
