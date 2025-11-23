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
	const typeData = state.boardChaosTokenOptions?.[payload.type] ?? {};
	const data = omit([payload.boardId], typeData);
	state.boardChaosTokenOptions = {
		...state.boardChaosTokenOptions,
		[payload.type]: data,
	};
};
