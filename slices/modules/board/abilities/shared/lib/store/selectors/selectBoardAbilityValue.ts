import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectBoardAbilityById } from "./selectBoardAbilityById";

export type SelectAbilityCounterOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityValue =
	({ boardId, abilityId }: SelectAbilityCounterOptions) =>
	(state: RootState) => {
		const ability = selectBoardAbilityById({ boardId, abilityId })(state);
		const values = selectBoardProp({
			boardId,
			prop: "abilityValues",
		})(state);

		if (!ability) {
			return 0;
		}
		const currentValue = values?.[abilityId];

		if (ability.type === "counter") {
			return currentValue ?? (ability.defaultValue || 0);
		}

		return currentValue || 0;
	};
