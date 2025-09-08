import { selectBoardActualPropValue } from "@modules/board/base/shared/lib";
import type {
	AbilityChecker,
	AbilityCheckerCallback,
} from "@modules/mechanics/board/abilities/entities/model";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createSelector } from "@reduxjs/toolkit";

export const selecCanUseSkidsOTooleFastAbility: AbilityCheckerCallback = (
	boardId,
) =>
	createSelector(
		[
			selectBoardActualPropValue({
				boardId,
				prop: "resources",
			}),
		],
		(resources) => resources > 1,
	);

export const SkidsOTooleFastAbilityChecker: AbilityChecker = {
	[AbilityCode.SkidsOToole.base.fast]: selecCanUseSkidsOTooleFastAbility,
};
