import type { AppThunk } from "@shared/model";
import { selectCurrentBoard } from "../../../../selectors";
import { setBoardProp } from "../../../board";
import { addCurrentHistoryItem } from "../../../history";
import { reduceCurrentStat } from "../../current";

type Options = {
	abilityId: string;
	value: number;
	prevValue: number;
};

export const setAbilityCounterEffect =
	({ abilityId, value, prevValue }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		const boardValue = board.value;

		// Diana Stanley
		if (abilityId === "diana-cards") {
			const diff = value - prevValue;
			dispatch(
				reduceCurrentStat({
					type: "willpower",
					reducer: (willpower) => willpower + diff,
				}),
			);
			return;
		}

		// Subject5U21
		if (abilityId === "ravenous") {
			const diff = Math.min(5, value) - Math.min(5, prevValue);

			if (diff === 0) {
				return;
			}

			const change = {
				willpower: boardValue.willpower + diff,
				intellect: boardValue.intellect + diff,
				combat: boardValue.combat + diff,
				agility: boardValue.agility + diff,
			};

			const data = {
				...board.value,
				...change,
			};

			dispatch(setBoardProp("value", data));

			dispatch(
				addCurrentHistoryItem({
					value: change,
				}),
			);
		}
	};
