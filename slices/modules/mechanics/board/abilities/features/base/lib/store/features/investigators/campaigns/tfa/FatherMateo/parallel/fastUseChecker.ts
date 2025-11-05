import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import type {
	AbilityChecker,
	AbilityCheckerCallback,
} from "@modules/mechanics/board/abilities/entities/model";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createSelector } from "@reduxjs/toolkit";

export const selecCanUseParallelFatherMateoAbility: AbilityCheckerCallback =
	() =>
		createSelector(
			[selectChaosBagContents, selectBoardsCount],
			(contents, boardsCount) => {
				const bless = contents.filter(
					({ type, sealed }) => type === "bless" && !sealed,
				);

				const sealedBoards = contents.filter(
					({ sealData, type }) =>
						type === "bless" &&
						sealData?.type === "investigator" &&
						sealData.boardId,
				);

				console.log({
					sealedBoards,
					boardsCount,
				});

				if (sealedBoards.length === boardsCount) {
					return false;
				}

				return bless.length > 0;
			},
		);

export const ParallelFatherMateoAbilityChecker: AbilityChecker = {
	[AbilityCode.FatherMateo.parallel]: selecCanUseParallelFatherMateoAbility,
};
