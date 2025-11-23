import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { omit } from "ramda";
import type { ChaosTokenValueHandler } from "../../../../model";

export type RemoveBoardChaosTokenValueInternalPayload = {
	boardId: number;
	type: ChaosTokenType;
};

export const handleRemoveBoardChaosTokenValueInternal: ChaosTokenValueHandler<
	RemoveBoardChaosTokenValueInternalPayload
> = (state, payload) => {
	const { boardId, type } = payload;
	const currentBoardData = state.boardChaosTokenValue?.[boardId] || {};
	const boardData = omit([type], currentBoardData);

	state.boardChaosTokenValue = {
		...state.boardChaosTokenValue,
		[boardId]: boardData,
	};
};
