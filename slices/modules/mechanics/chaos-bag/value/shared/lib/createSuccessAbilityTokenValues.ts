import { getIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib/store/getters";
import type {
	InvestigatorBoard,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";

type Options = PropsWithBoard & {
	token: ChaosTokenType;
	abilityId: string;
	boards: InvestigatorBoard[];
};

export const createSuccessAbilityTokenValues = ({
	board,
	abilityId,
	token,
	boards,
}: Options): ChaosTokenValues => {
	const isUsed = getIsBoardAbilityUsed({
		board,
		abilityId,
		boardsCount: boards.length,
	});

	if (!isUsed) {
		return {};
	}

	return {
		[token]: "success",
	};
};
