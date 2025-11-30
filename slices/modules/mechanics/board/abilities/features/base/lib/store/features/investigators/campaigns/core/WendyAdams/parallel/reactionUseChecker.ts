import type {
	AbilityChecker,
	AbilityCheckerCallback,
} from "@modules/mechanics/board/abilities/entities/model";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createSelector } from "@reduxjs/toolkit";
import { selectTokenGroups } from "./lib";

export const selecCanUseParallelWendyAdamsReactionAbility: AbilityCheckerCallback =
	(boardId) =>
		createSelector([selectTokenGroups(boardId)], (groups) => {
			const { chaosBag, history } = groups;

			const chaosBagBless = chaosBag.bless.count;
			const chaosBagCurse = chaosBag.curse.count;

			const historyBless = history.bless.count;
			const historyCurse = history.curse.count;

			return (
				chaosBagBless > 0 ||
				chaosBagCurse > 0 ||
				historyBless > 0 ||
				historyCurse > 0
			);
		});

export const ParallelWendyAdamsReactionUseChecker: AbilityChecker = {
	[AbilityCode.WendyAdams.parallel]:
		selecCanUseParallelWendyAdamsReactionAbility,
};
