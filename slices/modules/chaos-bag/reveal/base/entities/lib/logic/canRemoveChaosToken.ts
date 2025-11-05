import { isChaosTokenTypeRemovable } from "@modules/chaos-bag/base/shared/lib";
import type { RevealedChaosBagToken } from "../../../shared/model";

export const canRemoveChaosToken = (token: RevealedChaosBagToken) => {
	if (token.sealed) {
		return false;
	}

	if (!isChaosTokenTypeRemovable(token.type)) {
		return false;
	}

	if (token.afterReveal?.type === "return" && token.afterReveal.count > 0) {
		return false;
	}

	return true;
};
