import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { omit } from "ramda";
import type { ChaosBagEffectHandler } from "../../../../model";

export type RemoveBoardChaosTokenOptionInternalPayload = {
	boardId: number;
	type: ChaosTokenType;
};

export const handleRemoveBoardChaosTokenOptionInternal: ChaosBagEffectHandler<
	RemoveBoardChaosTokenOptionInternalPayload
> = (state, payload) => {
	const boardData = state.boardChaosTokenOptions?.[payload.boardId] ?? {};
	const data = omit([payload.type], boardData);

	state.boardChaosTokenOptions = {
		...state.boardChaosTokenOptions,
		[payload.boardId]: data,
	};
};
