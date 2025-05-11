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
import { sendNotification } from "@features/notifications";
import * as S from "@shared/lib";
import { useCallback } from "react";
import * as C from "./SettingsPage.components";
import {
	hapticValues,
	healthSanityModeValues,
	languageValues,
	turnEndValues,
} from "./values";

export const SettingsPage = () => {
	const { t } = useAppTranslation();
	const dispatch = S.useAppDispatch();

	const clearImageCache = useCallback(() => {
		dispatch(S.clearImageCache());
		dispatch(
			sendNotification({
				content: {
					title: t`Image cache cleared`,
					autoDismiss: true,
				},
				trigger: null,
			}),
		);
	}, [dispatch, t]);

	return (
		<C.Page title="Settings">
			<C.Content>
				<C.Section title={t`General`}>
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
							selector={S.selectKeepAwake}
							actionCreator={S.setKeepAwake}
						/>
					</C.Row>
					<C.Row>
						<C.Sound />
					</C.Row>
				</C.Section>
				<C.Section title={t`Investigator`}>
					<C.Row>
						<C.Select
							label="Turn end"
							selector={S.selectEndTurnStrict}
							actionCreator={S.setEndTurnStrict}
							data={turnEndValues}
						/>
					</C.Row>
					<C.Row>
						<C.Select
							label="Health/Sanity"
							selector={S.selectShowDamageAndHorror}
							actionCreator={S.setShowDamageAndHorror}
							data={healthSanityModeValues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Track experience points"
							selector={S.selectTrackXP}
							actionCreator={S.setTrackXP}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Save trauma"
							selector={S.selectSaveTrauma}
							actionCreator={S.setSaveTrauma}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Track Hand Size"
							selector={S.selectTrackHandSize}
							actionCreator={S.setTrackHandSize}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Doom"
							selector={S.selectShowInvestigatorDoom}
							actionCreator={S.setShowInvestigatorDoom}
						/>
					</C.Row>
				</C.Section>
				<C.Section title={t`Scenario`}>
					<C.Row>
						<C.Checkbox
							label="Doom"
							selector={S.selectShowDoom}
							actionCreator={S.setShowDoom}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Clues"
							selector={S.selectShowScenarioClues}
							actionCreator={S.setShowScenarioClues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Resources"
							selector={S.selectShowScenarioResources}
							actionCreator={S.setShowScenarioResources}
						/>
					</C.Row>
				</C.Section>
				<C.Section title={t`Behavior`}>
					<C.Row>
						<C.Picker />
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Damage/Horror visual effects"
							selector={S.selectShowDamageAndHorrorEffects}
							actionCreator={S.setShowDamageAndHorrorEffects}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Chaos bag loading animation"
							selector={selectChaosBagLoadingAnimation}
							actionCreator={setChaosBagLoadingAnimation}
						/>
					</C.Row>
				</C.Section>

				<C.Section title={t`Diagnostics`}>
					<C.Row>
						<C.Button
							text={t`Clear image cache`}
							icon="image"
							onPress={clearImageCache}
						/>
					</C.Row>
				</C.Section>
			</C.Content>
		</C.Page>
	);
};
