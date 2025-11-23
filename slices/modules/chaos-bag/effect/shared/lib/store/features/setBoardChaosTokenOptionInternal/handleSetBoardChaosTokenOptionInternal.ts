import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffectHandler } from "../../../../model";

export type SetBoardChaosTokenOptionInternalPayload = {
	boardId: number;
	type: ChaosTokenType;
	optionIndex: number | null;
};

export const handleSetBoardChaosTokenOptionInternal: ChaosBagEffectHandler<
	SetBoardChaosTokenOptionInternalPayload
> = (state, { boardId, type, optionIndex }) => {
	const boardData = state.boardChaosTokenOptions?.[type] ?? {};

	state.boardChaosTokenOptions = {
		...state.boardChaosTokenOptions,
		[type]: {
			...boardData,
			[boardId]: optionIndex,
		},
	};
};
