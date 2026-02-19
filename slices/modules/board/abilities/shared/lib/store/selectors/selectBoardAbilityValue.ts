import { createBoardPropSelectorInput } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { selectBoardAbilityById } from "./selectBoardAbilityById";

export type SelectAbilityCounterOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityValue =
	({ boardId, abilityId }: SelectAbilityCounterOptions) =>
	(state: RootState) =>
		select(state, boardId, abilityId);

const select = createSelector(
	[
		createBoardPropSelectorInput("abilityValues"),
		(_, _boardId: BoardId, abilityId: string) => abilityId,
		(state, boardId: BoardId, abilityId: string) =>
			selectBoardAbilityById({ boardId, abilityId })(state),
	],
	(values, abilityId, ability) => {
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
