import type {
	ChaosBagHandler,
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { validateChaosBagUpdate } from "../../util";

export type SetChaosBagContentsPayload = {
	contents: ChaosBagToken[];
	/** ISO 8601 timestamp */
	lastUpdatedAt: string;
};

export const handleSetChaosBagContents: ChaosBagHandler<
	SetChaosBagContentsPayload
> = (state, payload) => {
	const { contents, lastUpdatedAt } = payload;
	if (!validateChaosBagUpdate(state, lastUpdatedAt)) {
		return;
	}
	state.contents = contents;
	state.tokenCount = contents.reduce(
		(acc, token) => {
			acc[token.type] = (acc[token.type] || 0) + 1;
			return acc;
		},
		{} as Record<ChaosTokenType, number>,
	);
	state.chaosBagUpdatedAt = new Date().toISOString();
};
