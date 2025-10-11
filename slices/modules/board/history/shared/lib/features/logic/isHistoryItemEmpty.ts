import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { equals } from "ramda";
import type { InvestigatorBoardHistoryItemData } from "../../../model";

type Options = {
	board: InvestigatorBoard;
	data: InvestigatorBoardHistoryItemData;
};

export const isHistoryItemEmpty = (options: Options) => {
	const { data, board } = options;

	const keys = Object.keys(data);

	if (keys.length === 0) {
		return true;
	}

	if (keys.length > 1) {
		return false;
	}

	if (!data.usedAbilities) {
		return false;
	}

	const { initialUsedAbilities = [] } = board;
	const { usedAbilities = initialUsedAbilities } = data;

	const isEquals = equals(usedAbilities, initialUsedAbilities);

	return isEquals;
};
