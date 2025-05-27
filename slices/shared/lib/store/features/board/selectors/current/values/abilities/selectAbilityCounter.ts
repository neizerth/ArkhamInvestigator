import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectBoardProp } from "../../../props";
import { selectAbilityById } from "./selectAbilityById";

export const selectAbilityCounter = (
	id: string,
	boardId: BoardId = "current",
) =>
	createSelector(
		[selectAbilityById(id), selectBoardProp(boardId, "abilityValues")],
		(ability, values) => {
			if (!ability) {
				return 0;
			}
			if (ability.type !== "counter") {
				return 0;
			}
			return values?.[id] ?? (ability.defaultValue || 0);
		},
	);
