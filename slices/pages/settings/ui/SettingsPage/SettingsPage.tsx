import { selectHapticMode, setHapticMode } from "@features/haptic";
import {
	changeLanguage,
	selectLanguage,
	useAppTranslation,
} from "@features/i18n";
import {
	selectEndTurnStrict,
	selectShowDamageAndHorror,
	selectShowDamageAndHorrorEffects,
	setEndTurnStrict,
	setShowDamageAndHorror,
	setShowDamageAndHorrorEffects,
} from "@shared/lib";
import { Title } from "@shared/ui";
import { ContentPage } from "@widgets/content/content-page";
import * as C from "./SettingsPage.components";
import {
	hapticValues,
	healthSanityModeValues,
	languageValues,
	turnEndValues,
} from "./values";

export const SettingsPage = () => {
	const { t } = useAppTranslation();

	return (
		<ContentPage title="Settings">
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
				<Title> {t`Game settings`}</Title>
				<C.Row>
					<C.Select
						label="Turn end"
						selector={selectEndTurnStrict}
						actionCreator={setEndTurnStrict}
						data={turnEndValues}
					/>
				</C.Row>
				<C.Row>
					<C.Select
						label="Health/Sanity"
						selector={selectShowDamageAndHorror}
						actionCreator={setShowDamageAndHorror}
						data={healthSanityModeValues}
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
