import { createFallbackInvestigator } from "@modules/mechanics/investigator/shared/lib";
import type { InvestigatorBoard } from "../../model";
import { createFallbackBoardValues } from "./createFallbackBoardValues";

export const createFallbackBoard = (): InvestigatorBoard => {
	const investigator = createFallbackInvestigator();

	return {
		id: 0,
		turnId: "fallback",
		index: -1,
		signatureGroupId: "fallback",
		investigator,
		image: investigator.image,
		historyIndex: -1,
		initialValue: createFallbackBoardValues(),
		baseValue: createFallbackBoardValues(),
		value: createFallbackBoardValues(),
		history: [],
		checkHistory: [],
		updatedAt: 0,
	};
};
