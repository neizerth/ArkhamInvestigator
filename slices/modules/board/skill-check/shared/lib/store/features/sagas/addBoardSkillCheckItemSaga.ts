import {
	changeBoardProp,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { v4 } from "uuid";
import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
} from "../../../value";
import { addBoardSkillCheckItemAction } from "../actions";
import {
	selectSkillCheckData,
	selectSkillCheckType,
	sendResultSignal,
} from "../skillCheck";

export function* addBoardSkillCheckItemSaga() {
	const payload: ActionCreatorPayload<typeof addBoardSkillCheckItemAction> =
		yield take(addBoardSkillCheckItemAction.match);

	const { boardId } = payload;

	const type: ReturnType<typeof selectSkillCheckType> =
		yield select(selectSkillCheckType);
	const unsafeExpression: ReturnType<typeof selectSkillCheckData> =
		yield select(selectSkillCheckData);

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (!type || !board) {
		return;
	}

	const expression = sanitizeSkillCheckExpression(unsafeExpression);

	const value = getSkillCheckValue({
		data: expression,
		value: board.value,
	});

	const item: SkillCheckHistoryItem = {
		id: v4(),
		type,
		expression,
		value,
	};

	const checkHistory = [...board.checkHistory, item];

	yield put(
		changeBoardProp({
			...payload,
			prop: "checkHistory",
			value: checkHistory,
		}),
	);

	yield put(sendResultSignal(value));
}
