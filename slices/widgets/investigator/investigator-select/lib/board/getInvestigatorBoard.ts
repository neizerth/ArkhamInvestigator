import {
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "@shared/config";
import { getBoardStats } from "@shared/lib";
import type { InvestigatorBoard, SelectedInvestigator } from "@shared/model";

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

	const baseValue = {
		...getBoardStats(signature),
		additionalAction: Boolean(additionalAction),
		resources: START_GAME_RESOURCES_COUNT,
		actions: NEW_TURN_ACTIONS_COUNT,
		clues: 0,
	};

	const value = {
		...baseValue,
		health: Math.max(0, baseValue.health - physicalTrauma),
		sanity: Math.max(0, baseValue.sanity - mentalTrauma),
	};

	return {
		id,
		signatureGroupId: selection.signatureGroupId,
		skinId: selection.skin?.id,

		investigator: signature,
		image: image,
		initialValue: baseValue,
		baseValue: baseValue,
		value,
		history: [],
		checkHistory: [],
		historyIndex: -1,
	};
};
