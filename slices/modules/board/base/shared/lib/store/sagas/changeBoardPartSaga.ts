import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import type { InvestigatorBoardValueProp } from "../../../model";
import { boardPropValueChanged, changeBoardPart } from "../actions";
import { setBoardPartInternal } from "../board";
import { getChangedBoardValueProps } from "../getters";
import { selectBoardById } from "../selectors";

const props: InvestigatorBoardValueProp[] = [
	"baseValue",
	"initialValue",
	"value",
];

export function* changeBoardPartSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardPart> = yield take(
		changeBoardPart.match,
	);
	const { boardId, data } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardPartInternal(payload));

	// generating changed value events

	for (const prop of props) {
		if (!(prop in payload.data)) {
			continue;
		}

		const value = data[prop];

		if (!value) {
			continue;
		}

		const changes = getChangedBoardValueProps({
			current: board[prop],
			changed: value,
		});

		for (const change of changes) {
			yield put(
				boardPropValueChanged({
					...payload,
					...change,
					type: prop,
				}),
			);
		}
	}
}
