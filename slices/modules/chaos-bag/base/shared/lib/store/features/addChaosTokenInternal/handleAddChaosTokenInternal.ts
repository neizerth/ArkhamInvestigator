import type {
	ChaosBagHandler,
	ChaosBagToken,
} from "@modules/chaos-bag/base/shared/model";
import { validateChaosBagUpdate } from "../../util";

export type HandleAddChaosTokenInternalPayload = {
	token: ChaosBagToken;
	lastUpdatedAt: string;
};

export const handleAddChaosTokenInternal: ChaosBagHandler<
	HandleAddChaosTokenInternalPayload
> = (state, { token, lastUpdatedAt }) => {
	if (!validateChaosBagUpdate(state, lastUpdatedAt)) {
		return;
	}
	const { type } = token;
	const count = state.tokenCount[type] ?? 0;
	state.contents.push(token);
	state.tokenCount[type] = Math.max(0, count + 1);
	state.chaosBagUpdatedAt = new Date().toISOString();
};
