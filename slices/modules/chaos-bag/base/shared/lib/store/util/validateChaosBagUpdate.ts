import { log } from "@modules/core/log/shared/config";
import moment from "moment";

import type { ChaosBagState } from "../chaosBag";

export type ValidateChaosBagUpdateArgs = {
	state: ChaosBagState;
	lastUpdatedAt: string;
	remote: boolean;
};

/**
 * Local: monotonic — refuse stale payloads vs locally observed `chaosBagUpdatedAt`.
 * Network: same `lastUpdatedAt` as `remoteUpdateAt` cannot apply twice (duplicate TCP / rebroadcast guard).
 */
export const validateChaosBagUpdate = ({
	state,
	lastUpdatedAt,
	remote,
}: ValidateChaosBagUpdateArgs): boolean => {
	if (remote && lastUpdatedAt === state.remoteUpdateAt) {
		log.warn(
			"chaos bag duplicate remote apply ignored (same remoteUpdateAt)",
			lastUpdatedAt,
		);
		return false;
	}

	if (remote) {
		return true;
	}

	if (!moment(lastUpdatedAt).isSameOrAfter(moment(state.chaosBagUpdatedAt))) {
		log.error(
			"chaos bag update is not valid",
			lastUpdatedAt,
			state.chaosBagUpdatedAt,
		);
		return false;
	}

	return true;
};
