import {
	selectAllowNegativeHealthAndSanity,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { openUnsealMoonTokenConfirm } from "../openUnsealMoonTokenConfirm";
import { handleUnsealMoonToken } from "./handleUnsealMoonToken";

function* worker({ payload }: ReturnType<typeof handleUnsealMoonToken>) {
	const { boardId, token, returnToRevealModal } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const canUseNegativeValues: ReturnType<
		typeof selectAllowNegativeHealthAndSanity
	> = yield select(selectAllowNegativeHealthAndSanity);

	const canDecreaseHealth = canUseNegativeValues || board.value.health > 0;
	const canDecreaseSanity = canUseNegativeValues || board.value.sanity > 0;

	const canDecreaseValues = canDecreaseHealth || canDecreaseSanity;

	if (!canDecreaseValues) {
		yield put(
			sendInvestigatorNotification({
				boardId,
				message: "chaosBag.unseal.moon.notAllowed",
				type: "error",
			}),
		);
		return;
	}

	yield put(
		openUnsealMoonTokenConfirm({
			id: token.id,
			boardId,
			returnToRevealModal,
		}),
	);
}

export function* handleUnsealMoonTokenSaga() {
	yield takeEvery(handleUnsealMoonToken.match, worker);
}
