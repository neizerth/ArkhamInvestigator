import { useAppTranslation } from "@features/i18n";
import { ContentPage } from "@widgets/content-page";
import * as C from "./SettingsPage.components";

export const SettingsPage = () => {
	const { t } = useAppTranslation();

	return (
		<ContentPage title={t`Settings`}>
			<C.Content>
				<C.Row>
					<C.Label>{t`Language`}</C.Label>
					<C.LanguageSelect />
				</C.Row>
				<C.Row>
					<C.Label>{t`Haptic`}</C.Label>
					<C.HapticSelect />
				</C.Row>
			</C.Content>
		</ContentPage>
	);
};
