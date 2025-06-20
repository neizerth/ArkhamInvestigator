import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import type { InvestigatorBoardValueProp } from "../../../model";
import {
	type ChangeBoardPropPayload,
	boardPropValueChanged,
	changeBoardProp,
} from "../actions";
import { setBoardPropInternal } from "../board";
import { getChangedBoardValueProps } from "../getters";
import { selectBoardById } from "../selectors";

export function* changeBoardPropSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardProp> = yield take(
		changeBoardProp.match,
	);

	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardPropInternal(payload));

	// generating changed value events

	if (!isBoardValuePayload(payload)) {
		return;
	}

	const changes = getChangedBoardValueProps({
		current: board[payload.prop],
		changed: payload.value,
	});

	for (const change of changes) {
		yield put(
			boardPropValueChanged({
				...payload,
				...change,
				type: payload.prop,
			}),
		);
	}
}

export const isBoardValuePayload = (
	payload: unknown,
): payload is ChangeBoardPropPayload<InvestigatorBoardValueProp> => {
	if (!payload || typeof payload !== "object") {
		return false;
	}
	if ("prop" in payload) {
		const { prop } = payload;
		return prop === "value" || prop === "baseValue" || prop === "initialValue";
	}

	return false;
};
