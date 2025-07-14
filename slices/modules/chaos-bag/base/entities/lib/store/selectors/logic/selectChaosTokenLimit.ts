import { selectUnlimitedChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { getChaosTokenLimit } from "../../../logic";

export const selectChaosTokenLimit =
	(type: ChaosTokenType) => (state: RootState) => {
		const unlimitedChaosTokens = selectUnlimitedChaosTokens(state);
		return getChaosTokenLimit({ type, unlimitedChaosTokens });
	};
