import {
	selectAllowNegativeHealthAndSanity,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { unsealChaosToken } from "../../unsealChaosToken";
import { unsealToken } from "../unsealToken";

function* worker({ payload }: ReturnType<typeof unsealChaosToken>) {
	const { id, boardId } = payload;
	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const canUseNegativeValues: ReturnType<
		typeof selectAllowNegativeHealthAndSanity
	> = yield select(selectAllowNegativeHealthAndSanity);

	const isMoonToken = token.type !== "moon";
	const canDecreaseHealth = canUseNegativeValues || board.value.health > 0;
	const canDecreaseSanity = canUseNegativeValues || board.value.sanity > 0;

	const canDecreaseValues = canDecreaseHealth || canDecreaseSanity;

	if (!isMoonToken) {
		yield put(
			unsealToken({
				boardId,
				token,
			}),
		);
	}

	if (!canDecreaseValues) {
		return;
	}
}

export function* handleTokenUnsealSaga() {
	yield takeEvery(unsealChaosToken.match, worker);
}
