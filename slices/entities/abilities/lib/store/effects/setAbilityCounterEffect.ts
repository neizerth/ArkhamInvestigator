import {
	addCurrentHistoryItem,
	reduceCurrentStat,
	selectCurrentBoard,
	setBoardProp,
	setStatTransaction,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";

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

		if (abilityId === "george-cards") {
			const diff = value - prevValue;
			const baseValue = board.baseValue.handSize + diff;
			const handSize = boardValue.handSize + diff;

			dispatch(
				setStatTransaction({
					statType: "handSize",
					value: handSize,
					baseValue,
					initialValue: value,
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
