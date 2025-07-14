import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectCurrentRevealedTokenId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";

export const selectCurrentToken = (state: RootState) => {
	const id = selectCurrentRevealedTokenId(state);
	const tokens = selectChaosBagContents(state);
	if (!id) {
		return;
	}
	return tokens.find(whereId(id));
};
