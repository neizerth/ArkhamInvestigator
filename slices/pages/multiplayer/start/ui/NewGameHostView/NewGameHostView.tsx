import { logoLight } from "@assets/images";
import { copyText } from "@modules/core/clipboard/entities/lib/store/features/copyText/copyText";
import { selectNickname } from "@modules/core/network/shared/lib";
import { selectAllNetworkClients } from "@modules/core/network/shared/lib/store/networkClient";
import {
	getHostDeeplink,
	getHostInviteCode,
} from "@modules/multiplayer/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Share, type ViewProps } from "react-native";
import * as C from "./NewGameHostView.components";

export type NewGameHostViewProps = ViewProps & {
	ip: string;
};

export const NewGameHostView = ({ ip, ...props }: NewGameHostViewProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const url = useMemo(() => getHostDeeplink(ip), [ip]);
	const code = useMemo(() => getHostInviteCode(ip), [ip]);
	const nickname = useAppSelector(selectNickname);
	const clients = useAppSelector(selectAllNetworkClients);

	const codePreview = code.match(/.{1,2}/g)?.join(" ") || "";

	const shareDeeplink = useCallback(() => {
		Share.share({
			title: t`Share`,
			url,
		});
	}, [url, t]);

	const copyCode = useCallback(() => {
		dispatch(copyText({ text: code }));
	}, [dispatch, code]);

	const playersCount = clients.length + 1;

	return (
		<C.Container {...props}>
			<C.Invite>
				<C.Code onPress={copyCode}>
					<C.CodeLabel>{t`Code`}</C.CodeLabel>
					<C.CodeValue>{codePreview}</C.CodeValue>
				</C.Code>
				<C.QRButton onPress={shareDeeplink}>
					<C.QR value={url} logo={logoLight} logoSize={62} size={120} />
				</C.QRButton>
				<C.Share onPress={shareDeeplink}>
					<C.ShareIcon icon="share" />
					<C.ShareText>{t`Share`}</C.ShareText>
				</C.Share>
			</C.Invite>
			<C.Info>
				<C.ClientsInfo>
					<C.ClientsCountText>
						{t`multiplayer.playersCount`}: {playersCount}
					</C.ClientsCountText>
				</C.ClientsInfo>
				<C.Clients>
					<C.Client>1. {nickname}</C.Client>
					{clients.map((client, index) => (
						<C.Client key={client.id}>
							{index + 2} {client.nickname}{" "}
						</C.Client>
					))}
				</C.Clients>

				{clients.length > 0 && (
					<C.Next text={t`Next`} icon="right-arrow" onPress={() => {}} />
				)}
			</C.Info>
		</C.Container>
	);
};
