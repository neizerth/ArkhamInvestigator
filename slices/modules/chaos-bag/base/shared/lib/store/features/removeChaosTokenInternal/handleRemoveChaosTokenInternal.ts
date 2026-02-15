import { whereId } from "@shared/lib/util";
import { reject } from "ramda";
import type { ChaosBagHandler } from "../../../../model";
import { validateChaosBagUpdate } from "../../util";

export type HandleRemoveChaosTokenInternalPayload = {
	id: string;
	lastUpdatedAt: string;
};

export const handleRemoveChaosTokenInternal: ChaosBagHandler<
	HandleRemoveChaosTokenInternalPayload
> = (state, { id, lastUpdatedAt }) => {
	if (!validateChaosBagUpdate(state, lastUpdatedAt)) {
		return;
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
