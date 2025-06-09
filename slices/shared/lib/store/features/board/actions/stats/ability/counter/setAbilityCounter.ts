import type { AppThunk, BoardId } from "@shared/model";
import { selectBoardProp } from "../../../../selectors";
import { setBoardProp } from "../../../board";
import { addCurrentHistoryItem } from "../../../history";

export const setAbilityCounter =
	(id: string, value: number, boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const abilityValues = selectBoardProp(boardId, "abilityValues")(state);

		const values = abilityValues || {};

		const data = {
			...values,
			[id]: value,
		};
		dispatch(setBoardProp("abilityValues", data, boardId));

		if (boardId === "current") {
			dispatch(
				addCurrentHistoryItem({
					abilityValues: data,
				}),
			);
		}
	};
