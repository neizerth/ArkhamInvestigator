import { selectHapticMode, setHapticMode } from "@features/haptic";
import {
	changeLanguage,
	selectLanguage,
	useAppTranslation,
} from "@features/i18n";
import {
	selectEndTurnStrict,
	selectShowDamageAndHorrorEffects,
	setEndTurnStrict,
	setShowDamageAndHorrorEffects,
} from "@shared/lib";
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
					<C.Select
						label="Language"
						selector={selectLanguage}
						actionCreator={changeLanguage}
						data={languageValues}
					/>
				</C.Row>
				<C.Row>
					<C.Select
						label="Haptic"
						selector={selectHapticMode}
						actionCreator={setHapticMode}
						data={hapticValues}
					/>
				</C.Row>
				<Title>{t`Game settings`}</Title>
				<C.Row>
					<C.Select
						label="Turn end"
						selector={selectEndTurnStrict}
						actionCreator={setEndTurnStrict}
						data={turnEndValues}
					/>
				</C.Row>
				<C.Row>
					<C.Checkbox
						label="Damage/Horror visual effects"
						selector={selectShowDamageAndHorrorEffects}
						actionCreator={setShowDamageAndHorrorEffects}
					/>
				</C.Row>
				<Title>{t`Behavior`}</Title>
				<C.Row>
					<C.Picker />
				</C.Row>
			</C.Content>
		</ContentPage>
	);
};
