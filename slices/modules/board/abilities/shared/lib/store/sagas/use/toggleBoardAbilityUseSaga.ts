import { put, select, takeEvery } from "redux-saga/effects";
import { setBoardAbilityUse, toggleBoardAbilityUse } from "../../actions";
import { selectBoardIsAbilityUsed } from "../../selectors";

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
