import { useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";
import Zeroconf, { type Service } from "react-native-zeroconf";
import { TCP_SERVICE_NAME } from "../../config";
import { selectNickname } from "../store";

export const useTCPServices = (intervalMs = 1000) => {
	const nickname = useAppSelector(selectNickname);
	const [services, setServices] = useState<Service[]>([]);

	useEffect(() => {
		const zeroconf = new Zeroconf();
		zeroconf.scan(TCP_SERVICE_NAME);

		const work = () => {
			const services = zeroconf.getServices();
			const serviceList = Object.values(services).filter(
				(service) => service.name !== nickname,
			);
			setServices(serviceList);
		};

		const interval = setInterval(work, intervalMs);

		work();

		return () => {
			zeroconf.stop();
			clearInterval(interval);
		};
	}, [intervalMs, nickname]);

	return services;
};
