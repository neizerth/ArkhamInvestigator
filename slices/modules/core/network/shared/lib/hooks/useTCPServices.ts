import { useAppSelector } from "@shared/lib";
import { ascend, descend, prop, sortWith, uniqBy } from "ramda";
import { useEffect, useState } from "react";
import Zeroconf from "react-native-zeroconf";
import { TCP_SERVICE_NAME } from "../../config";
import type { ZeroconfService } from "../../model";
import { selectDeviceNetworkId, selectNetworkDiscoveryEnabled } from "../store";

export const useTCPServices = (intervalMs = 1000) => {
	const networkDiscoveryEnabled = useAppSelector(selectNetworkDiscoveryEnabled);
	const [services, setServices] = useState<ZeroconfService[]>([]);
	const networkId = useAppSelector(selectDeviceNetworkId);

	useEffect(() => {
		if (!networkDiscoveryEnabled) {
			return;
		}
		const zeroconf = new Zeroconf();
		zeroconf.scan(TCP_SERVICE_NAME);

		const work = () => {
			const zeroconfServices = zeroconf.getServices();
			const serviceList: ZeroconfService[] = Object.values(zeroconfServices)
				.filter(
					(service) =>
						service.addresses &&
						service.addresses.length > 0 &&
						Boolean(service.txt.networkId) &&
						service.txt.networkId !== networkId,
				)
				.map((service, index) => ({
					...service,
					index,
					networkId: service.txt.networkId,
				}));

			const sortedServiceList = sortWith(
				[ascend(prop("networkId")), descend(prop("index"))],
				serviceList,
			);

			const services = uniqBy(prop("networkId"), sortedServiceList);

			setServices(services);
		};

		const interval = setInterval(work, intervalMs);

		work();

		return () => {
			zeroconf.stop();
			clearInterval(interval);
		};
	}, [intervalMs, networkDiscoveryEnabled, networkId]);

	return services;
};
