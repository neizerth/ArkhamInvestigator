import {
	selectBoardActualPropValue,
	selectClues,
	selectSyncScenarioClues,
	setBoardActualPropValue,
	setClues,
} from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import type { AppThunk } from "@shared/model";

type Payload = PropsWithBoardId & {
	value: number;
};
export const setInvestigatorClues =
	({ boardId, value }: Payload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const syncEnabled = selectSyncScenarioClues(state);

		const investigatorClues = selectBoardActualPropValue({
			boardId,
			prop: "clues",
		})(state);

		dispatch(
			setBoardActualPropValue({
				boardId,
				prop: "clues",
				value,
			}),
		);

		if (!syncEnabled) {
			return;
		}

		const diff = investigatorClues - value;

		if (diff <= 0) {
			return;
		}

		const scenarioClues = selectClues(state);

		dispatch(setClues(scenarioClues + diff));

		dispatch(
			sendInvestigatorNotification({
				boardId,
				message: "clues.scenario.add",
				data: {
					count: diff,
				},
			}),
		);
	};
