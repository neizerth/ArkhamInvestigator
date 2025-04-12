import {
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "@shared/config";
import { getBoardStats } from "@shared/lib";
import type { InvestigatorBoard, SelectedInvestigator } from "@shared/model";

type Options = {
	id: number;
	selection: SelectedInvestigator;
};

export const getInvestigatorBoard = ({
	selection,
	id,
}: Options): InvestigatorBoard => {
	const { signature, image } = selection;
	const { additionalAction } = signature;

	const value = {
		...getBoardStats(signature),
		additionalAction: Boolean(additionalAction),
		resources: START_GAME_RESOURCES_COUNT,
		actions: NEW_TURN_ACTIONS_COUNT,
		clues: 0,
	};

	return {
		id,
		signatureGroupId: selection.signatureGroupId,
		skinId: selection.skin?.id,

		investigator: signature,
		image: image,
		initialValue: value,
		baseValue: value,
		value,
		history: [],
		checkHistory: [],
		historyIndex: -1,
	};
};
