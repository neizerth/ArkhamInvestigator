import type { ChaosBagHandler, ChaosBagTokenData } from "../../../../model";
import { validateChaosBagUpdate } from "../../util";

export type HandleUpdateChaosTokenInternalPayload = {
	id: string;
	data: Partial<ChaosBagTokenData>;
	lastUpdatedAt: string;
};

export const handleUpdateChaosTokenInternal: ChaosBagHandler<
	HandleUpdateChaosTokenInternalPayload
> = (state, { id, data, lastUpdatedAt }) => {
	if (!validateChaosBagUpdate(state, lastUpdatedAt)) {
		return;
	}
	state.contents = state.contents.map((token) => {
		if (token.id === id) {
			return {
				...token,
				...data,
			};
		}

		return token;
	});
	state.chaosBagUpdatedAt = new Date().toISOString();
};
