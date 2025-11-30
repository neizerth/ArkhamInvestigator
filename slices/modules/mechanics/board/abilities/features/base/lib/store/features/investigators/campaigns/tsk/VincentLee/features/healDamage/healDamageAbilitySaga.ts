import { healDamage } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { healDamage as VincentLeeHealDamage } from "./healDamage";

function* worker({ payload }: ReturnType<typeof VincentLeeHealDamage>) {
	const { targetBoardId, boardId } = payload;

	const boardSelector = selectBoardById(targetBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.value.health >= board.baseValue.health) {
		return;
	}

	yield put(
		healDamage({
			boardId: targetBoardId,
			sourceBoardId: boardId,
			value: 1,
		}),
	);
}

export function* VincentLeeHealDamageAbilitySaga() {
	yield takeEvery(VincentLeeHealDamage.match, worker);
}
