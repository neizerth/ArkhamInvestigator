import {
	selectBoardProp,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { additionalActionAbility } from "../../../config";
import { isBoardAbility } from "../../info/isBoardAbility";

export const selectBoardAbilities =
	(boardId: BoardId) => (state: RootState) => {
		const investigator = selectBoardProp({
			prop: "investigator",
			boardId,
		})(state);
		const investigatorsCount = selectBoardsCount(state);

		if (!investigator) {
			return [];
		}
		const { abilities = [] } = investigator;
		const baseAbilities = abilities.filter(
			(ability) =>
				ability.visible !== false &&
				isBoardAbility({
					ability,
					investigatorsCount,
				}),
		);

		if (!investigator.additionalAction) {
			return baseAbilities;
		}

		return [...baseAbilities, additionalActionAbility];
	};
