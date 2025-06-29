import type { ChaosBagToken } from "../../../model";
import type { ChaosBagHandler } from "../../../model/store";

export const handleAddChaosTokenInternal: ChaosBagHandler<ChaosBagToken> = (
	state,
	payload,
) => {
	state.contents.push(payload);
};
