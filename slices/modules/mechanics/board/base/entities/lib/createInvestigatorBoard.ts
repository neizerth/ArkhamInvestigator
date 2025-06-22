import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { getSignatureAbilityValues } from "@modules/mechanics/investigator/lib";
import type { SelectedInvestigator } from "@shared/model";
import { mergeDeepRight } from "ramda";
import {
	DEFAULT_HAND_SIZE,
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
	investigatorBoardModifications,
} from "../../shared/config";
import { getSignatureStats } from "./getSignatureStats";

type Options = {
	id: number;
	code: string;
	index: number;
	selection: SelectedInvestigator;
	physicalTrauma: number;
	mentalTrauma: number;
};

export const createInvestigatorBoard = (
	options: Options,
): InvestigatorBoard => {
	const { id, index, physicalTrauma, mentalTrauma, selection } = options;

	const { signature, image, signatureGroupId } = selection;
	const { additionalAction, code } = signature;

	const initialValue = {
		...getSignatureStats(signature),
		additionalAction: Boolean(additionalAction),
		resources: START_GAME_RESOURCES_COUNT,
		actions: NEW_TURN_ACTIONS_COUNT,
		handSize: DEFAULT_HAND_SIZE,
		upkeepResourcesIncrease: 0,
		clues: 0,
		doom: 0,
	};

	const baseValue = { ...initialValue };

	const value = {
		...baseValue,
		health: Math.max(0, baseValue.health - physicalTrauma),
		sanity: Math.max(0, baseValue.sanity - mentalTrauma),
	};

	const skinId = selection.skin?.id;

	const abilityValues = getSignatureAbilityValues(signature);

	const defaultBoard: InvestigatorBoard = {
		id,
		index,
		signatureGroupId,
		skinId,
		investigator: signature,
		image,
		initialValue,
		baseValue: baseValue,
		value,
		history: [],
		checkHistory: [],
		historyIndex: -1,
		usedAbilities: [],
		abilityValues,
	};

	const modification = investigatorBoardModifications[code] || {};

	return mergeDeepRight(defaultBoard, modification);
};
