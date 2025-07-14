import type { ChaosTokenType } from "@features/game/chaos-bag/model";
import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { RootState } from "@shared/model";
import { canRemoveChaosTokenFromBag } from "../../../../logic";

export const selectCanRemoveChaosTokenFromBag =
	(type: ChaosTokenType) => (state: RootState) => {
		const tokenCount = selectChaosBagTokenCount(state);
		return canRemoveChaosTokenFromBag({
			tokenCount,
			type,
		});
	};
