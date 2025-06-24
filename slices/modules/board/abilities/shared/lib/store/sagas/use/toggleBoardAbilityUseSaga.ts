import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { setBoardAbilityUse, toggleBoardAbilityUse } from "../../actions";
import { selectBoardIsAbilityUsed } from "../../selectors";

export function* toggleBoardAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof toggleBoardAbilityUse> =
		yield take(toggleBoardAbilityUse.match);

	const selectIsUsed = selectBoardIsAbilityUsed(payload);

	const isUsed: ReturnType<typeof selectIsUsed> = yield select(selectIsUsed);

	yield put(
		setBoardAbilityUse({
			...payload,
			use: !isUsed,
		}),
	);
}
