import { getIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib/store/getters";
import type {
	InvestigatorBoard,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

type Options = PropsWithBoard & {
	token: ChaosTokenType;
	abilityId: string;
	boards: InvestigatorBoard[];
	value: ChaosTokenValue;
	activeUseValue?: boolean;
};

export const createAbilityTokenValues = ({
	board,
	abilityId,
	token,
	boards,
	value,
	activeUseValue = true,
}: Options): ChaosTokenValues => {
	const isUsed = getIsBoardAbilityUsed({
		board,
		abilityId,
		boardsCount: boards.length,
	});

	if (isUsed !== activeUseValue) {
		return {};
	}

	return {
		[token]: value,
	};
};
