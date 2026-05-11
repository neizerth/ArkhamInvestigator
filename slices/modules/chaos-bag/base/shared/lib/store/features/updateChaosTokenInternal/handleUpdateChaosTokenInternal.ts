import type {
	ChaosBagMutationHandler,
	ChaosBagTokenData,
} from "@modules/chaos-bag/base/shared/model";
import { validateChaosBagUpdate } from "../../util";

export type HandleUpdateChaosTokenInternalPayload = {
	id: string;
	data: Partial<ChaosBagTokenData>;
	lastUpdatedAt: string;
};

export const handleUpdateChaosTokenInternal: ChaosBagMutationHandler<
	HandleUpdateChaosTokenInternalPayload
> = ({ state, remote, id, data, lastUpdatedAt }) => {
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
