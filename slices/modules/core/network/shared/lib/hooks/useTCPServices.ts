import { useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";
import Zeroconf, { type Service } from "react-native-zeroconf";
import { TCP_SERVICE_NAME } from "../../config";
import { selectNetworkDiscoveryEnabled, selectNickname } from "../store";

export const useTCPServices = (intervalMs = 1000) => {
	const nickname = useAppSelector(selectNickname);
	const networkDiscoveryEnabled = useAppSelector(selectNetworkDiscoveryEnabled);
	const [services, setServices] = useState<Service[]>([]);

	useEffect(() => {
		if (!networkDiscoveryEnabled) {
			return;
		}
		const zeroconf = new Zeroconf();
		zeroconf.scan(TCP_SERVICE_NAME);

		const work = () => {
			const zeroconfServices = zeroconf.getServices();
			const services = Object.values(zeroconfServices).filter(
				(service) =>
					service.addresses &&
					service.addresses.length > 0 &&
					Boolean(service.txt.name) &&
					service.txt.name !== nickname,
			);
			setServices(services);
		};

		const interval = setInterval(work, intervalMs);

		work();

		return () => {
			zeroconf.stop();
			clearInterval(interval);
		};
	}, [intervalMs, nickname, networkDiscoveryEnabled]);

	return services;
};
