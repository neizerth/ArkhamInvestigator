import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";
import { validateChaosBagUpdate } from "../../util";

export type HandleClearChaosBagInternalPayload = {
	lastUpdatedAt: string;
};

export const handleClearChaosBagInternal: ChaosBagHandler<
	HandleClearChaosBagInternalPayload
> = (state, { lastUpdatedAt }) => {
	if (!validateChaosBagUpdate(state, lastUpdatedAt)) {
		return;
	}
	state.contents = [];
	state.tokenCount = {};
	state.chaosBagUpdatedAt = new Date().toISOString();
};
