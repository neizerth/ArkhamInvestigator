import { generateRandomNickname } from "@modules/core/network/entities/lib/store/features/generateRandomNickname";
import {
	networkRoles,
	networkTypeIconMapping,
} from "@modules/core/network/shared/config";
import {
	selectHotspotEnabled,
	selectIP,
	selectNetworkConnected,
	selectNetworkRole,
	selectNetworkType,
	selectNickname,
	setNetworkRole,
	setNickname,
} from "@modules/core/network/shared/lib";
import type { NetworkRole } from "@modules/core/network/shared/model";
import {
	useAppDispatch,
	useAppSelector,
	useBoolean,
	whereId,
} from "@shared/lib";
import { type TabItem, Text } from "@shared/ui";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./StartMultiplayerPage.components";

const roles = networkRoles.map((role) => ({
	id: role,
	title: `multiplayer.role.${role}.title`,
}));

const getRole = (role: NetworkRole | null) => {
	return roles.find(whereId(role)) ?? roles[0];
};

export const StartMultiplayerPage = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const ip = useAppSelector(selectIP);
	const networkConnected = useAppSelector(selectNetworkConnected);
	const networkType = useAppSelector(selectNetworkType);
	const nickname = useAppSelector(selectNickname);
	const networkRole = useAppSelector(selectNetworkRole);
	const hotspotEnabled = useAppSelector(selectHotspotEnabled);
	const icon = hotspotEnabled ? "podcast" : networkTypeIconMapping[networkType];

	const [showIP, setShowIP] = useBoolean(false);

	const defaultRole = getRole(networkRole);

	const [role, setRole] = useState<TabItem<NetworkRole>>(defaultRole);

	useEffect(() => {
		if (networkRole === role.id) {
			return;
		}
		dispatch(setNetworkRole(role.id));
	}, [dispatch, role.id, networkRole]);

	useEffect(() => {
		const value = getRole(networkRole);

		if (value === role) {
			return;
		}
		setRole(value);
	}, [networkRole, role]);

	const onChangeNickname = useCallback(
		(text: string) => {
			dispatch(setNickname(text));
		},
		[dispatch],
	);

	const generateNickname = useCallback(() => {
		dispatch(generateRandomNickname());
	}, [dispatch]);

	const networkConnectionLabel = networkConnected
		? t`network.no-local-ip`
		: t`network.no-connection`;

	return (
		<C.Page title={t`Multiplayer`}>
			<C.Content>
				<C.Player>
					<C.Nickname>
						<C.NicknameInput
							placeholder={t`network.username`}
							fixedPlaceholder
							value={nickname ?? ""}
							onChangeText={onChangeNickname}
						/>
						{!showIP && (
							<C.GenerateRandomNickname onPress={generateNickname}>
								<C.GenerateIcon icon="loop2" />
							</C.GenerateRandomNickname>
						)}
					</C.Nickname>
					<C.NetworkInfo onPress={setShowIP.toggle}>
						<C.NetworkIcon icon={icon} />
						{showIP && <Text>{ip ?? networkConnectionLabel}</Text>}
					</C.NetworkInfo>
				</C.Player>
				<C.Hint>{t`multiplayer.hint`}</C.Hint>
				<C.RoleTabs>
					<C.RoleSelect
						data={roles}
						value={role}
						onSelect={setRole}
						translate
					/>
					<C.RoleTabsContent>
						{role.id === "host" && <C.Host />}
						{role.id === "client" && <C.Client />}
					</C.RoleTabsContent>
				</C.RoleTabs>
			</C.Content>
		</C.Page>
	);
};
