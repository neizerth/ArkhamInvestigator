import { put, select, takeEvery } from "redux-saga/effects";
import { selectBoardIsAbilityUsed } from "../../../selectors";
import { setBoardAbilityUse } from "../setBoardAbilityUse/setBoardAbilityUse";
import { toggleBoardAbilityUse } from "./toggleBoardAbilityUse";
function* worker({ payload }: ReturnType<typeof toggleBoardAbilityUse>) {
	const selectIsUsed = selectBoardIsAbilityUsed(payload);

	const isUsed: ReturnType<typeof selectIsUsed> = yield select(selectIsUsed);

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
