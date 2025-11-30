import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { getSignatureAbilityValues } from "@modules/mechanics/investigator/entities/lib";
import type { PartiallyRequired } from "@shared/model";
import { mergeDeepRight } from "ramda";
import { v4 } from "uuid";
import {
	DEFAULT_HAND_SIZE,
	DEFAULT_UPKEEP_RESOURCES_INCREASE,
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
	investigatorBoardModifications,
} from "../config";
import { getSignatureStats } from "./getSignatureStats";

type Options = PartiallyRequired<
	InvestigatorBoard,
	"id" | "index" | "signatureGroupId" | "image" | "skinId" | "investigator"
> & {
	physicalTrauma?: number;
	mentalTrauma?: number;
};

export const createInvestigatorBoard = ({
	physicalTrauma = 0,
	mentalTrauma = 0,
	...options
}: Options): InvestigatorBoard => {
	const { investigator } = options;

	const { code } = investigator;

	const initialValue = {
		...getSignatureStats(investigator),
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

	const turnId = v4();

	const loaded = !investigator.has_full_image;

	const defaultBoard: InvestigatorBoard = {
		...options,
		turnId,
		initialValue,
		baseValue,
		value,
		history: [],
		checkHistory: [],
		historyIndex: -1,
		usedAbilities: [],
		abilityValues,
		initialUsedAbilities: [],
		loaded,
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
