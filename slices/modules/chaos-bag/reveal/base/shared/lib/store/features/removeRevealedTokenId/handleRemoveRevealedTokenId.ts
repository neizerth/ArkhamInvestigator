import { equals, last, reject } from "ramda";
import type { ChaosBagRevealHandler } from "../../../../model";

export const handleRemoveRevealedTokenId: ChaosBagRevealHandler<string> = (
	state,
	id,
) => {
	const ids = reject(equals(id), state.revealedTokenIds);
	state.revealedTokenIds = ids;

	state.currentRevealedTokenId = last(ids) || null;
};
