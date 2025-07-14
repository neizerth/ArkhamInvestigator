import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { canRemoveMultipleChaosTokensFromBag } from "../../../../logic";

type Options = {
	type: ChaosTokenType;
	count: number;
};
export const selectCanRemoveMultipleChaosTokensFromBag =
	(options: Options) => (state: RootState) => {
		const tokenCount = selectChaosBagTokenCount(state);
		return canRemoveMultipleChaosTokensFromBag({
			...options,
			tokenCount,
		});
	};
