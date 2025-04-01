import { selectHapticMode, setHapticMode } from "@features/haptic";
import {
	changeLanguage,
	selectLanguage,
	useAppTranslation,
} from "@features/i18n";
import { selectEndTurnStrict, setEndTurnStrict } from "@shared/lib";
import { Title } from "@shared/ui";
import { ContentPage } from "@widgets/content-page";
import * as C from "./SettingsPage.components";
import { hapticValues, languageValues, turnEndValues } from "./values";

export const SettingsPage = () => {
	const { t } = useAppTranslation();

	return (
		<ContentPage title={t`Settings`}>
			<C.Content>
				<C.Row>
					<C.Label>{t`Language`}</C.Label>
					<C.Select
						selector={selectLanguage}
						actionCreator={changeLanguage}
						data={languageValues}
					/>
				</C.Row>
				<C.Row>
					<C.Label>{t`Haptic`}</C.Label>
					<C.Select
						selector={selectHapticMode}
						actionCreator={setHapticMode}
						data={hapticValues}
					/>
				</C.Row>
				<Title>{t`Game settings`}</Title>
				<C.Row>
					<C.Label>{t`Turn end`}</C.Label>
					<C.Select
						selector={selectEndTurnStrict}
						actionCreator={setEndTurnStrict}
						data={turnEndValues}
					/>
				</C.Row>
			</C.Content>
		</ContentPage>
	);
};
