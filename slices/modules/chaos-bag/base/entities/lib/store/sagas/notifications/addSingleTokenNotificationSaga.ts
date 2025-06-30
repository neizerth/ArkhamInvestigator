import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { notify } from "@modules/core/notifications/shared/lib";
import { select, takeEvery } from "redux-saga/effects";
import { singleChaosTokenAdded } from "../../actions";

function* worker({ payload }: ReturnType<typeof singleChaosTokenAdded>) {
	const { boardId } = payload;

	if (typeof boardId !== "number") {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (!board) {
		return;
	}

	const { type } = payload.token;

	const token = chaosToken.character[type];
	const { name } = board.investigator;

	notify({
		message: "chaosBag.addToken",
		data: {
			name,
			token,
			count: 1,
		},
	});
}

export function* addSingleTokenNotificationSaga() {
	yield takeEvery(singleChaosTokenAdded.match, worker);
}
