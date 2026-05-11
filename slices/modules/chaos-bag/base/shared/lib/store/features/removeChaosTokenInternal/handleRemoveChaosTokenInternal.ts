import type { ChaosBagMutationHandler } from "@modules/chaos-bag/base/shared/model";
import { whereId } from "@shared/lib/util";
import { reject } from "ramda";
import { validateChaosBagUpdate } from "../../util";

export type HandleRemoveChaosTokenInternalPayload = {
	id: string;
	lastUpdatedAt: string;
};

export const handleRemoveChaosTokenInternal: ChaosBagMutationHandler<
	HandleRemoveChaosTokenInternalPayload
> = ({ state, remote, id, lastUpdatedAt }) => {
	if (
		!validateChaosBagUpdate({
			state,
			lastUpdatedAt,
			remote,
		})
	) {
		return;
	}
	if (remote) {
		state.remoteUpdateAt = lastUpdatedAt;
	}
	const token = state.contents.find(whereId(id));
	if (!token) {
		return;
	}
	const { type } = token;
	const count = state.tokenCount[type];
	if (typeof count !== "number") {
		return;
	}
	state.contents = reject(whereId(id), state.contents);
	state.tokenCount[type] = Math.max(0, count - 1);
	state.chaosBagUpdatedAt = new Date().toISOString();
};
