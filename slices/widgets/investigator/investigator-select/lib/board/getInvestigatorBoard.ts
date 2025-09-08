import {
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "@shared/config";
import { getBoardStats } from "@shared/lib";
import type { InvestigatorBoard, SelectedInvestigator } from "@shared/model";
import { getDefaultUpkeepResourceIncrease } from "./getDefaultUpkeepResourceIncrease";
import { getDefaultUsedAbilities } from "./getDefaultUsedAbilities";
import { getInitialHandSize } from "./getInitialHandSize";
import { getBaseHandSize } from "./geеBaseHandSize";

type Options = {
	index: number;
	selection: SelectedInvestigator;
	physicalTrauma?: number;
	mentalTrauma?: number;
};

export const getInvestigatorBoard = ({
	selection,
	index,
	physicalTrauma = 0,
	mentalTrauma = 0,
}: Options): InvestigatorBoard => {
	const { signature, image } = selection;
	const { additionalAction, code } = signature;

	const initialValue = {
		...getBoardStats(signature),
		additionalAction: Boolean(additionalAction),
		resources: START_GAME_RESOURCES_COUNT,
		actions: NEW_TURN_ACTIONS_COUNT,
		handSize: getInitialHandSize(code),
		upkeepResourcesIncrease: 0,
		clues: 0,
		doom: 0,
	};

	const baseValue = {
		...initialValue,
		upkeepResourcesIncrease: getDefaultUpkeepResourceIncrease(code),
		handSize: getBaseHandSize(code) || initialValue.handSize,
	};

	const value = {
		...baseValue,
		health: Math.max(0, initialValue.health - physicalTrauma),
		sanity: Math.max(0, initialValue.sanity - mentalTrauma),
	};

	const usedAbilities = getDefaultUsedAbilities(code);

	return {
		id: index + 1,
		index,
		signatureGroupId: selection.signatureGroupId,
		skinId: selection.skin?.id,

		investigator: signature,
		image: image,
		initialValue,
		baseValue: baseValue,
		value,
		history: [],
		checkHistory: [],
		historyIndex: -1,
		usedAbilities,
	};
};
