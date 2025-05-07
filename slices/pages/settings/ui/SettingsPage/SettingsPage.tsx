import {
	selectChaosBagLoadingAnimation,
	setChaosBagLoadingAnimation,
} from "@features/chaos-bag";
import { selectHapticMode, setHapticMode } from "@features/haptic";
import {
	changeLanguage,
	selectLanguage,
	useAppTranslation,
} from "@features/i18n";
import {
	selectEndTurnStrict,
	selectKeepAwake,
	selectSaveTrauma,
	selectShowDamageAndHorror,
	selectShowDamageAndHorrorEffects,
	selectTrackHandSize,
	selectTrackXP,
	setEndTurnStrict,
	setKeepAwake,
	setSaveTrauma,
	setShowDamageAndHorror,
	setShowDamageAndHorrorEffects,
	setTrackHandSize,
	setTrackXP,
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
				<C.Row>
					<C.Checkbox
						label="Keep awake"
						selector={selectKeepAwake}
						actionCreator={setKeepAwake}
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
				<C.Row>
					<C.Checkbox
						label="Track experience points"
						selector={selectTrackXP}
						actionCreator={setTrackXP}
					/>
				</C.Row>
				<C.Row>
					<C.Checkbox
						label="Save trauma"
						selector={selectSaveTrauma}
						actionCreator={setSaveTrauma}
					/>
				</C.Row>
				<C.Row>
					<C.Checkbox
						label="Track Hand Size"
						selector={selectTrackHandSize}
						actionCreator={setTrackHandSize}
					/>
				</C.Row>
				<Title>{t`Behavior`}</Title>
				<C.Row>
					<C.Picker />
				</C.Row>
				<C.Row>
					<C.Checkbox
						label="Chaos bag loading animation"
						selector={selectChaosBagLoadingAnimation}
						actionCreator={setChaosBagLoadingAnimation}
					/>
				</C.Row>
			</C.Content>
		</ContentPage>
	);
};
