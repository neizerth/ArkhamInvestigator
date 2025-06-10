import { selectModalId, useModal } from "@modules/core/modal/shared/lib";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import { APP_DOWNLOAD_URL } from "@shared/config/app";
import { selectAppOutdated, useAppSelector } from "@shared/lib";
import { useCallback, useEffect } from "react";
import { Linking } from "react-native";

export const useOutdatedApp = () => {
	const { t } = useAppTranslation();
	const outdated = useAppSelector(selectAppOutdated);
	const modalId = useAppSelector(selectModalId);

	const onOk = useCallback(() => {
		if (!APP_DOWNLOAD_URL) {
			return;
		}
		Linking.openURL(APP_DOWNLOAD_URL);
	}, []);

	const [show] = useModal({
		id: "update-app",
		data: {
			contentType: "text",
			type: "faction",
			faction: "survivor",
			title: t`app.outdated.title`,
			text: t`app.outdated.text`,
			okText: t`Download now`,
		},
		onOk,
		onCancel: false,
		onClose: false,
	});

	useEffect(() => {
		if (!outdated || modalId) {
			return;
		}
		show();
	}, [outdated, show, modalId]);
};
