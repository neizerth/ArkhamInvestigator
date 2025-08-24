import { selectChaosTokenCountByType } from "@modules/chaos-bag/base/entities/lib";
import type { AbilityChecker } from "@modules/mechanics/board/abilities/entities/model";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createSelector } from "@reduxjs/toolkit";

export const selecCanUseParallelZoeySamarasFastAbility = () =>
	createSelector([selectChaosTokenCountByType("bless")], (count) => count > 2);

export const ParallelZoeySamarasFastAbilityChecker: AbilityChecker = {
	[AbilityCode.ZoeySamaras.parallel.fast]:
		selecCanUseParallelZoeySamarasFastAbility,
};
