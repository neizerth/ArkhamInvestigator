import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { getSignatureAbilityValues } from "@modules/mechanics/investigator/entities/lib";
import type { InvestigatorImage } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";
import { mergeDeepRight } from "ramda";
import {
	DEFAULT_HAND_SIZE,
	DEFAULT_UPKEEP_RESOURCES_INCREASE,
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
	investigatorBoardModifications,
} from "../config";
import { getSignatureStats } from "./getSignatureStats";

type Options = {
	id: number;
	index: number;
	physicalTrauma?: number;
	mentalTrauma?: number;
	investigator: InvestigatorSignature;
	signatureGroupId: string;
	image: InvestigatorImage;
	skinId?: string;
};

export const createInvestigatorBoard = (
	options: Options,
): InvestigatorBoard => {
	const {
		id,
		index,
		physicalTrauma = 0,
		mentalTrauma = 0,
		investigator,
		signatureGroupId,
		image,
		skinId,
	} = options;

	const { additionalAction, code } = investigator;

	const initialValue = {
		...getSignatureStats(investigator),
		additionalAction: Boolean(additionalAction),
		resources: START_GAME_RESOURCES_COUNT,
		actions: NEW_TURN_ACTIONS_COUNT,
		handSize: DEFAULT_HAND_SIZE,
		upkeepResourcesIncrease: 0,
		clues: 0,
		doom: 0,
	};

	const baseValue = {
		...initialValue,
		upkeepResourcesIncrease: DEFAULT_UPKEEP_RESOURCES_INCREASE,
	};

	const value = {
		...baseValue,
		health: Math.max(0, baseValue.health - physicalTrauma),
		sanity: Math.max(0, baseValue.sanity - mentalTrauma),
	};

	const abilityValues = getSignatureAbilityValues(investigator);

	const defaultBoard: InvestigatorBoard = {
		id,
		index,
		signatureGroupId,
		skinId,
		investigator,
		image,
		initialValue,
		baseValue,
		value,
		history: [],
		checkHistory: [],
		historyIndex: -1,
		usedAbilities: [],
		abilityValues,
		gameTextSize: null,
	};

	const modificationCallback = investigatorBoardModifications[code];

	const modification = modificationCallback
		? modificationCallback({
				physicalTrauma,
				mentalTrauma,
				investigator,
			})
		: {};

	return mergeDeepRight(defaultBoard, modification);
};
