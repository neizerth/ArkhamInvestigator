import { useEffect, useState } from "react";
import Zeroconf, { type Service } from "react-native-zeroconf";
import { TCP_SERVICE_NAME } from "../../config";

export const useTCPServices = (intervalMs = 1000) => {
	const [services, setServices] = useState<Service[]>([]);

	useEffect(() => {
		const zeroconf = new Zeroconf();
		zeroconf.scan(TCP_SERVICE_NAME);

		const work = () => {
			const services = zeroconf.getServices();
			const serviceList = Object.values(services);
			setServices(serviceList);
		};

		const interval = setInterval(work, intervalMs);

		work();

		return () => {
			zeroconf.stop();
			clearInterval(interval);
		};
	}, [intervalMs]);

	return services;
};
