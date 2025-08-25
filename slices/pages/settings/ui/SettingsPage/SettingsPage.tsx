import * as B from "@modules/board/base/shared/lib";
import * as SC from "@modules/board/skill-check/shared/lib";
import * as chaosBag from "@modules/chaos-bag/base/shared/lib";
import { setKeepAwake } from "@modules/core/device/entities/keep-awake";
import { selectKeepAwake } from "@modules/core/device/shared/lib";
import {
	selectHapticMode,
	setHapticMode,
} from "@modules/core/haptic/shared/lib";
import { loadLanguage, selectLanguage } from "@modules/core/i18n/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import {
	selectEnableNavigationAnimation,
	setEnableNavigationAnimation,
} from "@modules/core/router/shared/lib";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import * as S from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as C from "./SettingsPage.components";
import {
	hapticValues,
	healthSanityModeValues,
	languageValues,
	tapOnPinValues,
	turnEndValues,
} from "./values";

export const SettingsPage = () => {
	const { t } = useTranslation();
	const dispatch = S.useAppDispatch();

	const clearImageCache = useCallback(() => {
		dispatch(S.clearImageCache());
		dispatch(
			sendNotification({
				message: "Image cache cleared",
			}),
		);
	}, [dispatch]);

	return (
		<C.Page title="Settings">
			<C.Content>
				<C.Section title={t`General`}>
					<C.Row>
						<C.Select
							label="Language"
							selector={selectLanguage}
							actionCreator={loadLanguage}
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
					<C.Row>
						<C.Checkbox
							label="navigation.animation"
							selector={selectEnableNavigationAnimation}
							actionCreator={setEnableNavigationAnimation}
						/>
					</C.Row>
					<C.Sound />
				</C.Section>
				<C.Section title={t`Game settings`}>
					<C.Row>
						<C.Select
							label="Turn end"
							selector={B.selectEndTurnStrict}
							actionCreator={B.setEndTurnStrict}
							data={turnEndValues}
						/>
					</C.Row>
					<C.Row>
						<C.Select
							label="Pinned calculations"
							selector={B.selectTapToHidePins}
							actionCreator={B.setTapToHidePins}
							data={tapOnPinValues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Show calculation changes"
							selector={SC.selectShowCalculationDiff}
							actionCreator={SC.setShowCalculationDiff}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Skill modfiers"
							selector={B.selectAlwaysShowSkillModifiers}
							actionCreator={B.setAlwaysShowSkillModifiers}
						/>
					</C.Row>
					<C.Rule />
					<C.Row>
						<C.Checkbox
							label="Save trauma"
							selector={B.selectSaveTrauma}
							actionCreator={B.setSaveTrauma}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Track experience points"
							selector={B.selectTrackXP}
							actionCreator={B.setTrackXP}
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
							selector={B.selectShowDamageAndHorror}
							actionCreator={B.setShowDamageAndHorror}
							data={healthSanityModeValues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Initial values"
							selector={B.selectShowInitialHealthAndSanity}
							actionCreator={B.setShowInitialHealthAndSanity}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Negative values"
							selector={B.selectAllowNegativeHealthAndSanity}
							actionCreator={B.setAllowNegativeHealthAndSanity}
						/>
					</C.Row>
					<C.Rule />
					<C.Row>
						<C.Checkbox
							label="Damage/Horror visual effects"
							selector={B.selectShowDamageAndHorrorEffects}
							actionCreator={B.setShowDamageAndHorrorEffects}
						/>
					</C.Row>
				</C.Section>
				<C.Section title={t`Investigator`}>
					<C.Row>
						<C.Checkbox
							label="Hand Size"
							selector={B.selectTrackHandSize}
							actionCreator={B.setTrackHandSize}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Doom"
							selector={B.selectShowInvestigatorDoom}
							actionCreator={B.setShowInvestigatorDoom}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Upkeep resources"
							selector={B.selectShowUpkeepResources}
							actionCreator={B.setShowUpkeepResources}
						/>
					</C.Row>
					{CAN_ALWAYS_SHOW_GAME_TEXT && (
						<>
							<C.Rule />
							<C.Row>
								<C.Checkbox
									label="Show Game Text"
									selector={B.selectAlwaysShowGameText}
									actionCreator={B.setAlwaysShowGameText}
								/>
							</C.Row>
						</>
					)}
				</C.Section>
				<C.Section title={t`Scenario`}>
					<C.Row>
						<C.Checkbox
							label="Doom"
							selector={B.selectShowDoom}
							actionCreator={B.setShowDoom}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Clues"
							selector={B.selectShowScenarioClues}
							actionCreator={B.setShowScenarioClues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Sync with investigator clues"
							hint="settings.syncScenarioClues.hint"
							selector={B.selectSyncScenarioClues}
							actionCreator={B.setSyncScenarioClues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Resources"
							selector={B.selectShowScenarioResources}
							actionCreator={B.setShowScenarioResources}
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
