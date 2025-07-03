import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";
import { equals, last, reject } from "ramda";

export const handleRemoveRevealedTokenId: ChaosBagHandler<string> = (
	state,
	id,
) => {
	const ids = reject(equals(id), state.revealedTokenIds);
	state.revealedTokenIds = ids;

	state.currentTokenId = last(ids) || null;
};
