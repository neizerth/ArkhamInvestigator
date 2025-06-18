import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardAbilityById } from "./selectBoardAbilityById";

export type SelectAbilityCounterOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityValue = ({
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
			const currentValue = values?.[abilityId];

			if (ability.type === "counter") {
				return currentValue ?? (ability.defaultValue || 0);
			}

			return currentValue || 0;
		},
	);
