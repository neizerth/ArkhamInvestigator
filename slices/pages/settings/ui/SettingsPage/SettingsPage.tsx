import { useAppTranslation } from "@features/i18n";
import { selectEndTurnStrict, setEndTurnStrict } from "@shared/lib";
import { Title } from "@shared/ui";
import { ContentPage } from "@widgets/content-page";
import { StoreSelect } from "@widgets/control/store-select";
import { TurnEndSelect } from "../TurnEndSelect";
import * as C from "./SettingsPage.components";
import { turnEndValues } from "./values";

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
				<Title>{t`Game settings`}</Title>
				<C.Row>
					<C.Label>{t`Turn end`}</C.Label>
					<StoreSelect
						selector={selectEndTurnStrict}
						reducer={setEndTurnStrict}
						data={turnEndValues}
					/>
				</C.Row>
			</C.Content>
		</ContentPage>
	);
};
