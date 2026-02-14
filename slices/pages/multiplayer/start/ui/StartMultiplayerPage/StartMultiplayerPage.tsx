import { generateRandomNickname } from "@modules/core/network/entities/lib/store/features/generateRandomNickname";
import {
	networkRoles,
	networkTypeIconMapping,
} from "@modules/core/network/shared/config";
import {
	selectIP,
	selectNetworkRole,
	selectNetworkType,
	selectNickname,
	selectSSID,
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./StartMultiplayerPage.components";

const roles: NetworkRole[] = ["client", "host"];

export const StartMultiplayerPage = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const ssid = useAppSelector(selectSSID);
	const ip = useAppSelector(selectIP);
	const networkType = useAppSelector(selectNetworkType);
	const nickname = useAppSelector(selectNickname);
	const networkRole = useAppSelector(selectNetworkRole);
	const icon = networkTypeIconMapping[networkType];

	const [showIP, setShowIP] = useBoolean(false);

	const roles = useMemo(
		() =>
			networkRoles.map((role) => ({
				id: role,
				title: t(`multiplayer.role.${role}.title`),
			})),
		[t],
	);

	const getRole = useCallback(
		(role: NetworkRole | null) => {
			return roles.find(whereId(role)) ?? roles[0];
		},
		[roles],
	);

	const defaultRole = getRole(networkRole);

	const [role, setRole] = useState<TabItem<NetworkRole>>(defaultRole);

	useEffect(() => {
		dispatch(setNetworkRole(role.id));
	}, [dispatch, role.id]);

	useEffect(() => {
		setRole(getRole(networkRole));
	}, [getRole, networkRole]);

	const onChangeNickname = useCallback(
		(text: string) => {
			dispatch(setNickname(text));
		},
		[dispatch],
	);

	const generateNickname = useCallback(() => {
		dispatch(generateRandomNickname());
	}, [dispatch]);

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
						<C.GenerateRandomNickname onPress={generateNickname}>
							<C.GenerateIcon icon="loop2" />
						</C.GenerateRandomNickname>
					</C.Nickname>
					<C.NetworkInfo onPress={setShowIP.toggle}>
						<C.NetworkIcon icon={icon} />
						{showIP && (
							<Text>
								{ip ?? t`network.no-connection`} {ssid && `(${ssid})`}
							</Text>
						)}
					</C.NetworkInfo>
				</C.Player>
				<C.Hint>{t`multiplayer.hint`}</C.Hint>
				<C.RoleTabs>
					<C.RoleSelect data={roles} value={role} onSelect={setRole} />
					<C.RoleTabsContent>
						{role.id === "host" && ip && <C.Host ip={ip} />}
						{role.id === "client" && <C.Client />}
					</C.RoleTabsContent>
				</C.RoleTabs>
			</C.Content>
		</C.Page>
	);
};
