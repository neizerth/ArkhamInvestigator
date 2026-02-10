import { useTCPServices } from "@modules/core/network/shared/lib";
import { isHostCodeValid } from "@modules/multiplayer/entities/lib";
import { setHostInviteCode } from "@modules/multiplayer/entities/lib/store/features/setHostInviteCode";
import { setZeroconfService } from "@modules/multiplayer/entities/lib/store/features/setZeroconfService";
import { useAppDispatch } from "@shared/lib";
import { Title } from "@shared/ui";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import type { Service } from "react-native-zeroconf";
import * as C from "./NewGameClientView.components";

export type NewGameClientViewProps = ViewProps;

export const NewGameClientView = (props: NewGameClientViewProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const services = useTCPServices();
	const [code, setCode] = useState("");

	const onApplyCode = useCallback(() => {
		dispatch(setHostInviteCode(code));
	}, [dispatch, code]);

	const onSelectService = useCallback(
		(service: Service) => {
			dispatch(setZeroconfService(service));
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
				icon="check"
				onPress={onApplyCode}
				disabled={!code || !isCodeValid}
			/>
			{services.length > 0 ? (
				<C.Services>
					<Title>{t`multiplayer.joinGame`}</Title>
					{services.map((service) => (
						<C.Service
							key={service.name}
							text={service.name}
							icon="investigator"
							onPress={() => onSelectService(service)}
						/>
					))}
				</C.Services>
			) : (
				<C.Search>
					<C.SearchIndicator />
					<C.SearchTitle>{t`multiplayer.searching`}</C.SearchTitle>
				</C.Search>
			)}
		</C.Container>
	);
};
