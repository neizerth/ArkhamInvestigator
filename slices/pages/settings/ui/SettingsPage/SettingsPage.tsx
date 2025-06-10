import * as chaosBag from "@features/game/chaos-bag";
import { showToast } from "@features/notifications/lib";
import {
	selectHapticMode,
	setHapticMode,
} from "@modules/core/haptic/shared/lib";
import {
	changeLanguage,
	selectLanguage,
	useAppTranslation,
} from "@modules/core/i18n/shared/lib";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import * as S from "@shared/lib";
import { useCallback } from "react";
import * as C from "./SettingsPage.components";
import {
	hapticValues,
	healthSanityModeValues,
	languageValues,
	tapOnPinValues,
	turnEndValues,
} from "./values";

export const SettingsPage = () => {
	const { t } = useAppTranslation();
	const dispatch = S.useAppDispatch();

	const clearImageCache = useCallback(() => {
		dispatch(S.clearImageCache());
		dispatch(showToast(t`Image cache cleared`));
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
					<C.Sound />
				</C.Section>
				<C.Section title={t`Game settings`}>
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
							label="Pinned calculations"
							selector={S.selectTapToHidePins}
							actionCreator={S.setTapToHidePins}
							data={tapOnPinValues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Show calculation changes"
							selector={S.selectShowCalculationDiff}
							actionCreator={S.setShowCalculationDiff}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Skill modfiers"
							selector={S.selectAlwaysShowSkillModifiers}
							actionCreator={S.setAlwaysShowSkillModifiers}
						/>
					</C.Row>
					<C.Rule />
					<C.Row>
						<C.Checkbox
							label="Save trauma"
							selector={S.selectSaveTrauma}
							actionCreator={S.setSaveTrauma}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Track experience points"
							selector={S.selectTrackXP}
							actionCreator={S.setTrackXP}
						/>
					</C.Row>
				</C.Section>
				<C.Section title={t`Chaos bag`}>
					<C.Row>
						<C.Checkbox
							label="Chaos bag"
							selector={chaosBag.selectChaosBagEnabled}
							actionCreator={chaosBag.setChaosBagEnabled}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Chaos bag loading animation"
							selector={chaosBag.selectChaosBagLoadingAnimation}
							actionCreator={chaosBag.setChaosBagLoadingAnimation}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Unlimited chaos tokens"
							selector={chaosBag.selectUnlimitedChaosTokens}
							actionCreator={chaosBag.setUnlimitedChaosTokens}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Modify tokens"
							selector={chaosBag.selectModifyChaosTokens}
							actionCreator={chaosBag.setModifyChaosTokens}
						/>
					</C.Row>
				</C.Section>
				<C.Section title={`${t`Health`}/${t`Sanity`}`}>
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
							label="Initial values"
							selector={S.selectShowInitialHealthAndSanity}
							actionCreator={S.setShowInitialHealthAndSanity}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Negative values"
							selector={S.selectAllowNegativeHealthAndSanity}
							actionCreator={S.setAllowNegativeHealthAndSanity}
						/>
					</C.Row>
					<C.Rule />
					<C.Row>
						<C.Checkbox
							label="Damage/Horror visual effects"
							selector={S.selectShowDamageAndHorrorEffects}
							actionCreator={S.setShowDamageAndHorrorEffects}
						/>
					</C.Row>
				</C.Section>
				<C.Section title={t`Investigator`}>
					<C.Row>
						<C.Checkbox
							label="Hand Size"
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
					<C.Row>
						<C.Checkbox
							label="Upkeep resources"
							selector={S.selectShowUpkeepResources}
							actionCreator={S.setShowUpkeepResources}
						/>
					</C.Row>
					{CAN_ALWAYS_SHOW_GAME_TEXT && (
						<>
							<C.Rule />
							<C.Row>
								<C.Checkbox
									label="Show Game Text"
									selector={S.selectAlwaysShowGameText}
									actionCreator={S.setAlwaysShowGameText}
								/>
							</C.Row>
						</>
					)}
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
							label="Sync with investigator clues"
							hint="settings.syncScenarioClues.hint"
							selector={S.selectSyncScenarioClues}
							actionCreator={S.setSyncScenarioClues}
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
