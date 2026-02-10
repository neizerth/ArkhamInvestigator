import { selectHostIp, useTCPServices } from "@modules/core/network/shared/lib";
import { isHostCodeValid } from "@modules/multiplayer/entities/lib";
import { setHostInviteCode } from "@modules/multiplayer/entities/lib/store/features/setHostInviteCode";
import { setZeroconfService } from "@modules/multiplayer/entities/lib/store/features/setZeroconfService";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { Text, Title } from "@shared/ui";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import type { Service } from "react-native-zeroconf";
import * as C from "./NewGameClientView.components";

export type NewGameClientViewProps = ViewProps;

export const NewGameClientView = (props: NewGameClientViewProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const hostIp = useAppSelector(selectHostIp);

	const services = useTCPServices();
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
			{services.length > 0 ? (
				<C.Services>
					<Title>{t`multiplayer.joinGame`}</Title>
					{services.map((s) => (
						<C.Service
							key={s.name}
							text={s.name}
							icon={s === service ? "check" : "investigator"}
							onPress={() => onSelectService(s)}
						/>
					))}
				</C.Services>
			) : (
				<C.Loading>
					<C.Loader />
					<Text>{t`multiplayer.searching`}</Text>
				</C.Loading>
			)}
			{hostIp && (
				<C.Loading>
					<C.Loader />
					<Text>{t`multiplayer.waitingForHost`}</Text>
				</C.Loading>
			)}
		</C.Container>
	);
};
