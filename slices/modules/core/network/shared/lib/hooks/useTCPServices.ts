import { seconds } from "@shared/lib";
import { useEffect, useMemo, useState } from "react";
import Zeroconf, { type Service } from "react-native-zeroconf";
import { TCP_SERVICE_NAME } from "../../config";

const defaultIntervalMs = seconds(5);

export const useTCPServices = (intervalMs = defaultIntervalMs) => {
	const [services, setServices] = useState<Record<string, Service>>({});

	useEffect(() => {
		const zeroconf = new Zeroconf();
		zeroconf.scan(TCP_SERVICE_NAME);

		const work = () => {
			setServices(zeroconf.getServices());
		};

		const interval = setInterval(work, intervalMs);

		work();

		return () => {
			zeroconf.stop();
			clearInterval(interval);
		};
	}, [intervalMs]);

	return useMemo(() => Object.values(services), [services]);
};
