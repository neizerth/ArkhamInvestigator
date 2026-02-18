import * as B from "@modules/board/base/shared/lib";
import * as SC from "@modules/board/skill-check/shared/lib";
import { setKeepAwake } from "@modules/core/device/entities/keep-awake";
import { selectKeepAwake } from "@modules/core/device/shared/lib";
import {
	selectHapticMode,
	setHapticMode,
} from "@modules/core/haptic/shared/lib";
import { loadLanguage, selectLanguage } from "@modules/core/i18n/shared/lib";
import { selectOffline } from "@modules/core/network/shared/lib";
import {
	selectEnableNavigationAnimation,
	setEnableNavigationAnimation,
} from "@modules/core/router/shared/lib";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "slices/shared/lib";
import { AppDiagnostics } from "../AppDiagnostics";
import { ChaosBagSettings } from "../ChaosBagSettings";
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
	const isOffline = useAppSelector(selectOffline);

	return (
		<C.Page title="Settings">
			<C.Content>
				<C.Section title={t`General`}>
					{!isOffline && (
						<C.Row>
							<C.Select
								label="Language"
								selector={selectLanguage}
								actionCreator={loadLanguage}
								data={languageValues}
							/>
						</C.Row>
					)}
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
				<ChaosBagSettings />
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
							label="Clues"
							selector={B.selectShowClues}
							actionCreator={B.setShowClues}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="Resources"
							selector={B.selectShowResources}
							actionCreator={B.setShowResources}
						/>
					</C.Row>
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
					{/* <C.Row>
						<C.Checkbox
							label="Ally slots"
							selector={B.selectShowAllySlots}
							actionCreator={B.setShowAllySlots}
						/>
					</C.Row> */}
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

				<AppDiagnostics />
			</C.Content>
		</C.Page>
	);
};
