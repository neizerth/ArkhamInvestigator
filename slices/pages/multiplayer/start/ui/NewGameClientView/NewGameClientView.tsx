import {
	selectNetworkDiscoveryEnabled,
	setNetworkDiscoveryEnabled,
} from "@modules/core/network/shared/lib";
import { isHostCodeValid } from "@modules/multiplayer/entities/lib";
import { setHostInviteCode } from "@modules/multiplayer/entities/lib/store/features/setHostInviteCode";
import { setZeroconfService } from "@modules/multiplayer/entities/lib/store/features/setZeroconfService";
import { HostDiscovery } from "@modules/multiplayer/features/ui";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import type { Service } from "react-native-zeroconf";
import * as C from "./NewGameClientView.components";

export type NewGameClientViewProps = ViewProps;

export const NewGameClientView = (props: NewGameClientViewProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const [code, setCode] = useState("");
	const [service, setService] = useState<Service | null>(null);

	const onApplyCode = useCallback(() => {
		dispatch(setHostInviteCode(code));
	}, [dispatch, code]);

	const onSelectService = useCallback(
		(service: Service) => {
			dispatch(setZeroconfService(service));
			setService(service);
		},
		[dispatch],
	);

	const isCodeValid = isHostCodeValid(code);

	return (
		<C.Container {...props}>
			<C.CodeInput
				placeholder={t`multiplayer.code`}
				onChangeText={setCode}
				maxLength={8}
			/>
			<C.Action
				text={t`multiplayer.connect`}
				icon="right-arrow"
				onPress={onApplyCode}
				disabled={!code || !isCodeValid}
			/>
			<C.Checkbox
				label={t`network.autoDiscover`}
				selector={selectNetworkDiscoveryEnabled}
				actionCreator={setNetworkDiscoveryEnabled}
			/>
			<HostDiscovery selected={service?.host} onSelect={onSelectService} />
		</C.Container>
	);
};
