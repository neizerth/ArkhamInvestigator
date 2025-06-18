import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import {
	resetBoardAbilityUseAction,
	setBoardAbilityUseAction,
	toggleBoardAbilityUseAction,
} from "../../actions";
import { selectBoardIsAbilityUsed } from "../../selectors";

export function* toggleBoardAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof toggleBoardAbilityUseAction> =
		yield take(toggleBoardAbilityUseAction.match);

	const selectIsUsed = selectBoardIsAbilityUsed(payload);

	const isUsed: ReturnType<typeof selectIsUsed> = yield select(selectIsUsed);

	if (isUsed) {
		yield put(resetBoardAbilityUseAction(payload));
	} else {
		yield put(setBoardAbilityUseAction(payload));
	}
}
