import { networkTypeIconMapping } from "@modules/core/network/shared/config";
import {
	selectIP,
	selectNetworkType,
	selectSSID,
} from "@modules/core/network/shared/lib";
import { useAppSelector } from "@shared/lib";
import { type TabItem, Text } from "@shared/ui";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./StartMultiplayerPage.components";

export const StartMultiplayerPage = () => {
	const { t } = useTranslation();
	const ssid = useAppSelector(selectSSID);
	const ip = useAppSelector(selectIP);
	const networkType = useAppSelector(selectNetworkType);
	const icon = networkTypeIconMapping[networkType];

	const roles = useMemo(
		() => [
			{
				id: "client",
				title: t`multiplayer.role.client.title`,
			},
			{
				id: "host",
				title: t`multiplayer.role.host.title`,
			},
		],
		[t],
	);

	const [role, setRole] = useState<TabItem>(roles[0]);

	return (
		<C.Page title={t`Multiplayer`}>
			<C.Content>
				<C.Player>
					<C.Name placeholder={t`network.username`} />
					<C.NetworkInfo>
						<C.NetworkIcon icon={icon} />
						<Text>
							{ip ?? t`network.no-connection`} {ssid && `(${ssid})`}
						</Text>
					</C.NetworkInfo>
				</C.Player>
				<C.RoleTabs>
					<C.RoleSelect data={roles} value={role} onSelect={setRole} />
					<C.RoleTabsContent>
						{role.id === "host" && ip && <C.Host ip={ip} />}
					</C.RoleTabsContent>
				</C.RoleTabs>
			</C.Content>
		</C.Page>
	);
};
