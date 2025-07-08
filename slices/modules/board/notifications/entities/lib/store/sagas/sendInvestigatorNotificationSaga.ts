import { selectDeclensedSignatureName } from "@modules/board/base/entities/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendInvestigatorNotification } from "../actions";

function* worker({ payload }: ReturnType<typeof sendInvestigatorNotification>) {
	const { boardId } = payload;

	const dativeSelector = selectDeclensedSignatureName({
		boardId,
		resultCase: "dative",
	});

	const dativeName: ReturnType<typeof dativeSelector> =
		yield select(dativeSelector);

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!dativeName) {
		return;
	}

	const { name } = board.investigator;
	const payloadData = payload.data || {};

	const data = {
		...payloadData,
		dativeName,
		name,
	};

	yield put(
		sendNotification({
			...payload,
			data,
		}),
	);
}

export function* sendInvestigatorNotificationSaga() {
	yield takeEvery(sendInvestigatorNotification.match, worker);
}
