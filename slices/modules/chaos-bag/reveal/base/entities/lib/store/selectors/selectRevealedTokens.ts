import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";
import { isNotNil } from "ramda";

export const selectRevealedTokens = (state: RootState) => {
	const tokens = selectRevealedTokenIds(state);
	const contents = selectChaosBagContents(state);
	return tokens.map((id) => contents.find(whereId(id))).filter(isNotNil);
};
