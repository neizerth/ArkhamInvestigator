import createHistoryType from "./2024-03-22-create-history-type";
import setHapticMode from "./2024-03-25T12-00-set-haptic-mode";
import setActionsStrict from "./2024-03-25T15-54-set-actions-strict";
import setShowDamageAndHorror from "./2024-03-26T07-42-set-show-damage-and-horror";
import clearInvestigatorBoards from "./2025-04-01T14-18-clear-boards";
import setDefaultDeceleration from "./2025-04-05T17-24-set-default-deceleration";
import clearInvestigatorBoardsFromReset from "./2025-04-13T21-24-reset-boards";
import clearImageCache from "./2025-05-10T23-09-clear-image-cache";
import clearInvestigatorBoardsFromMay13 from "./2025-05-13T13-11-clear-boards";
import setDefaultPinnedCalculations from "./2025-05-16T16-16-set-default-pinned-calculations";
import setDefaultChaosBagHistory from "./2025-05-17T11-36-set-default-chaos-bag-history";
import setDefaultChaosBagEnabled from "./2025-05-19T22-22-set-default-chaos-bag-enabled";
import setDefaultStoryTypeFilter from "./2025-05-20T16-06-set-default-story-type-filter";
import setDefaultReferenceCardParams from "./2025-05-22T13-48-set-default-reference-card-params";
import clearInvestigatorBoardsFromMay24 from "./2025-05-24T19-51-clear-boards";
import setDefaultUnlimitedChaosTokens from "./2025-05-26T07-14-set-default-unlimited-chaos-tokens";
import initRoundReference from "./2025-06-01T17-10-init-round-reference";
import refactorSignatures from "./2025-09-14T19-00-refactor-signatures";
import clearInvestigatorBoardsFromSep17 from "./2025-09-17T22-16-clear-boards";
import initPickerAnimation from "./2025-09-25T06-56-28-init-picker-animation";
import setShowCluesDefaultValue from "./2025-10-04T02-11-30-set-show-clues-default-value";
import setShowResourcesDefaultValue from "./2025-10-06T01-38-39-set-show-resources-default-value";
import movePickerSliceValues from "./2025-10-07T03-42-56-move-picker-slice-values";
import setAndroidAssetsUrl from "./2025-10-31T09-56-56-set-android-assets-url";
import addSealedContents from "./2025-11-04T08-21-08-add-sealed-contents";
import setDefaultSkillCheckModifier from "./2025-11-10T10-25-18-set-default-skill-check-modifier";
import addDefaultMinSkillOddsValue from "./2025-12-19T12-01-39-add-default-min-skill-odds-value";
import moveInvestigatorSettings from "./2025-12-30T01-56-41-move-investigator-settings";
import setDefaultNetworkId from "./2026-02-10T01-49-22-set-default-network-id";

export const persistConfigMigrations = [
	createHistoryType,
	setHapticMode,
	setActionsStrict,
	setShowDamageAndHorror,
	clearInvestigatorBoards,
	setDefaultDeceleration,
	clearInvestigatorBoardsFromReset,
	clearImageCache,
	clearInvestigatorBoardsFromMay13,
	setDefaultPinnedCalculations,
	setDefaultChaosBagHistory,
	setDefaultChaosBagEnabled,
	setDefaultStoryTypeFilter,
	setDefaultReferenceCardParams,
	clearInvestigatorBoardsFromMay24,
	setDefaultUnlimitedChaosTokens,
	initRoundReference,
	refactorSignatures,
	clearInvestigatorBoardsFromSep17,
	initPickerAnimation,
	setShowCluesDefaultValue,
	setShowResourcesDefaultValue,
	movePickerSliceValues,
	setAndroidAssetsUrl,
	addSealedContents,
	setDefaultSkillCheckModifier,
	addDefaultMinSkillOddsValue,
	moveInvestigatorSettings,
	setDefaultNetworkId,
];

export const currentPersistMigrationVersion = persistConfigMigrations.length;
