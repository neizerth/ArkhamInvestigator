import { selectBoardProp } from "@modules/board/base/shared/lib/store/features/board/selectors/props/selectBoardProp";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardAbilityById } from "./selectBoardAbilityById";

export type SelectAbilityCounterOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityCounter = ({
	boardId,
	abilityId,
}: SelectAbilityCounterOptions) =>
	createSelector(
		[
			selectBoardAbilityById({ boardId, abilityId }),
			selectBoardProp({
				boardId,
				prop: "abilityValues",
			}),
		],
		(ability, values) => {
			if (!ability) {
				return 0;
			}
			if (ability.type !== "counter") {
				return 0;
			}
			return values?.[abilityId] ?? (ability.defaultValue || 0);
		},
	);
