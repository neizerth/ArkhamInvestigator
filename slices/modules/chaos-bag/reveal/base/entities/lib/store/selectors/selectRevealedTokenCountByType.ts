import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { propEq } from "ramda";
import { selectRevealedTokens } from "./selectRevealedTokens";

export const selectRevealedTokenCountByType =
	(type: ChaosTokenType) => (state: RootState) => {
		const tokens = selectRevealedTokens(state);
		return tokens.filter(propEq(type, "type")).length;
	};
