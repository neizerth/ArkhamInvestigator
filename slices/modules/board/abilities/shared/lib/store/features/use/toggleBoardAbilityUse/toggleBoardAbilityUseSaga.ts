import { put, select, takeEvery } from "redux-saga/effects";
import { selectBoardIsAbilityUsed } from "../../../selectors";
import { checkBoardAbilityUse } from "../checkBoardAbilityUse";
import { setBoardAbilityUse } from "../setBoardAbilityUse/setBoardAbilityUse";
import { toggleBoardAbilityUse } from "./toggleBoardAbilityUse";
function* worker({ payload }: ReturnType<typeof toggleBoardAbilityUse>) {
	const selectIsUsed = selectBoardIsAbilityUsed(payload);

	const isUsed: ReturnType<typeof selectIsUsed> = yield select(selectIsUsed);

	if (!isUsed) {
		yield put(checkBoardAbilityUse(payload));
		return;
	}

	yield put(
		setBoardAbilityUse({
			...payload,
			use: isUsed,
		}),
	);
}

export function* toggleBoardAbilityUseSaga() {
	yield takeEvery(toggleBoardAbilityUse.match, worker);
}
