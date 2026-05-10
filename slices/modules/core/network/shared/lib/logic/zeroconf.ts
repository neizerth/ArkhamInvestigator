import Zeroconf from "react-native-zeroconf";
import { TCP_PORT, TCP_SERVICE_NAME } from "../../config";

export const publishZeroconfService = ({
	name,
	networkId,
}: { name: string; networkId: string }) => {
	const zeroconf = new Zeroconf();

	// Scan for existing services
	const services = getZeroconfServices();
	const existingServices = services.filter(
		(service) => service.txt.networkId === networkId,
	);

	for (const service of existingServices) {
		zeroconf.unpublishService(service.name);
	}

	zeroconf.publishService(TCP_SERVICE_NAME, "tcp", "local.", name, TCP_PORT, {
		networkId,
	});
};

export const unpublishZeroconfServiceByName = (name: string) => {
	const zeroconf = new Zeroconf();
	zeroconf.unpublishService(name);
};

export const unpublishZeroconfServiceByNetworkId = (networkId: string) => {
	const zeroconf = new Zeroconf();
	const services = getZeroconfServices();
	const existingServices = services.filter(
		(service) => service.txt.networkId === networkId,
	);

	for (const service of existingServices) {
		zeroconf.unpublishService(service.name);
	}
};

export const getZeroconfServices = () => {
	const zeroconf = new Zeroconf();
	zeroconf.scan(TCP_SERVICE_NAME);
	const services = zeroconf.getServices();
	return Object.values(services);
};
