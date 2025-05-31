import {
	DEFAULT_HAND_SIZE,
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "@shared/config";
import { getBoardStats } from "@shared/lib";
import type { InvestigatorBoard, SelectedInvestigator } from "@shared/model";
import { getDefaultUpkeepResourceincrease } from "./getDefaultUpkeepResourceincrease";

type Options = {
	id: number;
	selection: SelectedInvestigator;
	physicalTrauma?: number;
	mentalTrauma?: number;
};

export const getInvestigatorBoard = ({
	selection,
	id,
	physicalTrauma = 0,
	mentalTrauma = 0,
}: Options): InvestigatorBoard => {
	const { signature, image } = selection;
	const { additionalAction } = signature;

	const upkeepResourcesIncrease = getDefaultUpkeepResourceincrease(
		signature.code,
	);

	const initialValue = {
		...getBoardStats(signature),
		additionalAction: Boolean(additionalAction),
		resources: START_GAME_RESOURCES_COUNT,
		actions: NEW_TURN_ACTIONS_COUNT,
		handSize: DEFAULT_HAND_SIZE,
		upkeepResourcesIncrease,
		clues: 0,
		doom: 0,
	};

	const baseValue = {
		...initialValue,
	};

	const value = {
		...baseValue,
		health: Math.max(0, initialValue.health - physicalTrauma),
		sanity: Math.max(0, initialValue.sanity - mentalTrauma),
	};

	return {
		id,
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
	};
};
