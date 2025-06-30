import type { ChaosBagToken } from "../../../model";
import type { ChaosBagHandler } from "../../../model";

export const handleAddChaosTokenInternal: ChaosBagHandler<ChaosBagToken> = (
	state,
	payload,
) => {
	const { type } = payload;
	const count = state.tokenCount[type] ?? 0;
	state.contents.push(payload);
	state.tokenCount[type] = count + 1;
};
