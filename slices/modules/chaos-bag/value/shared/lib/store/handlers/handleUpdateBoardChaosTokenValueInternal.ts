import type {
	ChaosBagHandler,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";

export type HandleUpdateBoardChaosTokenValueInternalPayload = {
	boardId: number;
	value: number;
	type: ChaosTokenType;
};

export const handleUpdateBoardChaosTokenValueInternal: ChaosBagHandler<
	HandleUpdateBoardChaosTokenValueInternalPayload
> = (state, { boardId, value, type }) => {
	const boardData = state.boardChaosTokenValue?.[boardId] || {};

	state.boardChaosTokenValue = {
		...state.boardChaosTokenValue,
		[boardId]: {
			...boardData,
			[type]: value,
		},
	};
};
