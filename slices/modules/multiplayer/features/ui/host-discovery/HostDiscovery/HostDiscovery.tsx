import { AndroidPermissionFragment } from "@modules/core/device/shared/ui";
import {
	selectHostIp,
	selectNetworkDiscoveryEnabled,
	useTCPServices,
} from "@modules/core/network/shared/lib";
import { useAppSelector } from "@shared/lib";
import { StoreDisplay, Text, Title } from "@shared/ui";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import type { Service } from "react-native-zeroconf";
import * as C from "./HostDiscovery.components";

export type HostDiscoveryProps = ViewProps & {
	/** The host IP address of the selected service */
	selected?: string;
	onSelect?: (service: Service) => void;
};

export const HostDiscovery = ({
	onSelect,
	selected,
	...props
}: HostDiscoveryProps) => {
	const { t } = useTranslation();
	return (
		<C.Container {...props}>
			<StoreDisplay selector={selectNetworkDiscoveryEnabled}>
				<AndroidPermissionFragment
					permission="ACCESS_FINE_LOCATION"
					fallback={<Text>{t`multiplayer.locationPermissionRequired`}</Text>}
				>
					<Container {...props} />
				</AndroidPermissionFragment>
			</StoreDisplay>
		</C.Container>
	);
};

export const Container = ({
	onSelect,
	selected,
	...props
}: HostDiscoveryProps) => {
	const { t } = useTranslation();
	const services = useTCPServices();
	const hostIp = useAppSelector(selectHostIp);

	return (
		<C.Container {...props}>
			{services.length > 0 ? (
				<C.Services>
					<Title>{t`multiplayer.joinGame`}</Title>
					{services.map((s) => (
						<C.Service
							key={s.name}
							text={s.name}
							icon={s.host === selected ? "check" : "investigator"}
							onPress={() => onSelect?.(s)}
						/>
					))}
				</C.Services>
			) : (
				<C.Loading>
					<C.Loader />
					<Text>{t`multiplayer.searching`}</Text>
				</C.Loading>
			)}
			{services.length > 0 && hostIp && (
				<C.Loading>
					<C.Loader />
					<Text>{t`multiplayer.waitingForHost`}</Text>
				</C.Loading>
			)}
		</C.Container>
	);
};
