import type { ChaosBagMutationHandler } from "@modules/chaos-bag/base/shared/model";
import { validateChaosBagUpdate } from "../../util";

export type HandleClearChaosBagInternalPayload = {
	lastUpdatedAt: string;
};

export const handleClearChaosBagInternal: ChaosBagMutationHandler<
	HandleClearChaosBagInternalPayload
> = ({ state, remote, lastUpdatedAt }) => {
	if (
		!validateChaosBagUpdate({
			state,
			lastUpdatedAt,
			remote,
		})
	) {
		return;
	}
	state.remoteUpdateAt = remote ? lastUpdatedAt : null;
	state.contents = [];
	state.tokenCount = {};
	state.chaosBagUpdatedAt = new Date().toISOString();
};
