import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValueHandler } from "../../../model";

export type HandleUpdateBoardChaosTokenValueInternalPayload = {
	boardId: number;
	value: number;
	type: ChaosTokenType;
};

export const handleUpdateBoardChaosTokenValueInternal: ChaosTokenValueHandler<
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
