import type {
	ChaosBagHandler,
	ChaosBagToken,
} from "@modules/chaos-bag/base/shared/model";

export const handleAddChaosTokenInternal: ChaosBagHandler<ChaosBagToken> = (
	state,
	payload,
) => {
	const { type } = payload;
	const count = state.tokenCount[type] ?? 0;
	state.contents.push(payload);
	state.tokenCount[type] = Math.max(0, count + 1);
};
