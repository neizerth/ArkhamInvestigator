import { logoLight } from "@assets/images";
import { copyText } from "@modules/core/clipboard/entities/lib/store/features/copyText/copyText";
import {
	getHostDeeplink,
	getHostInviteCode,
} from "@modules/multiplayer/entities/lib";
import { useAppDispatch } from "@shared/lib";
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
	return (
		<C.Container {...props}>
			<C.Invite>
				<C.Code onPress={copyCode}>
					<C.CodeLabel>{t`Code`}</C.CodeLabel>
					<C.CodeValue>{codePreview}</C.CodeValue>
				</C.Code>
				<C.QRButton onPress={shareDeeplink}>
					<C.QR value={url} logo={logoLight} logoSize={62} size={140} />
				</C.QRButton>
				<C.Share onPress={shareDeeplink}>
					<C.ShareIcon icon="share" />
					<C.ShareText>{t`Share`}</C.ShareText>
				</C.Share>
			</C.Invite>
		</C.Container>
	);
};
