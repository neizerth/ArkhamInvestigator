import type { ChaosBagOddsToken } from "../../../model";

export const createChaosOddsGroupFilter =
	({ type, revealCount, value }: ChaosBagOddsToken) =>
	(token: ChaosBagOddsToken) => {
		if (token.type !== type) {
			return false;
		}

		if (token.revealCount !== revealCount) {
			return false;
		}

		if (token.value !== value) {
			return false;
		}

		return true;
	};
