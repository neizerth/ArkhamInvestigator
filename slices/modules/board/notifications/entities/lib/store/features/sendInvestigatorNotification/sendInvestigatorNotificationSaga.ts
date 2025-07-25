import { selectDeclensedSignatureName } from "@modules/board/base/entities/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { getInvestigatorImageUrl } from "@shared/api";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendInvestigatorNotification } from "./sendInvestigatorNotification";

function* worker({ payload }: ReturnType<typeof sendInvestigatorNotification>) {
	const { boardId, sourceBoardId } = payload;

	const dativeSelector = selectDeclensedSignatureName({
		boardId,
		resultCase: "dative",
	});

	const dativeName: ReturnType<typeof dativeSelector> =
		yield select(dativeSelector);

	if (!dativeName) {
		return;
	}

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);
	let sourceBoard: InvestigatorBoard | undefined;

	if (sourceBoardId) {
		sourceBoard = yield select(selectBoardById(sourceBoardId));
	}

	const sourceImage =
		sourceBoard?.investigator.image || board.investigator.image;

	const { name } = board.investigator;
	const payloadData = payload.data || {};

	const data = {
		...payloadData,
		dativeName,
		name,
	};

	const image1 = getInvestigatorImageUrl({
		code: sourceImage.id,
		type: "square",
	});

	const image2 =
		sourceBoard &&
		getInvestigatorImageUrl({
			code: board.investigator.image.id,
			type: "square",
		});

	yield put(
		sendNotification({
			...payload,
			image1,
			image2,
			data,
		}),
	);
}

export function* sendInvestigatorNotificationSaga() {
	yield takeEvery(sendInvestigatorNotification.match, worker);
}
