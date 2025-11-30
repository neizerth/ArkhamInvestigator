import { selectBoardById } from "@modules/board/base/shared/lib";
import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import { put, select, takeEvery } from "redux-saga/effects";
import { type NameData, getData } from "./getData";
import { sendInvestigatorNotification } from "./sendInvestigatorNotification";

function* worker(action: ReturnType<typeof sendInvestigatorNotification>) {
	const { payload } = action;
	const { boardId, sourceBoardId } = payload;

	const nameData: NameData = yield getData(action);

	if (!nameData.dativeName) {
		return;
	}

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);
	let sourceBoard: InvestigatorBoard | undefined;

	if (sourceBoardId) {
		sourceBoard = yield select(selectBoardById(sourceBoardId));
	}

	const payloadData = payload.data || {};

	const faction = getBoardFaction(board);
	const sourceFaction = sourceBoard && getBoardFaction(sourceBoard);

	const data = {
		...payloadData,
		...nameData,
	};

	const targetImage = getSignatureImageUrl({
		code: board.investigator.image.id,
		type: "square",
	});

	const sourceImage =
		sourceBoard &&
		getSignatureImageUrl({
			code: sourceBoard.investigator.image.id,
			type: "square",
		});

	yield put(
		sendNotification({
			...payload,
			faction: sourceFaction || faction,
			faction2: sourceFaction && faction,
			image1: sourceImage || targetImage,
			image2: sourceImage && targetImage,
			data,
		}),
	);
}

export function* sendInvestigatorNotificationSaga() {
	yield takeEvery(sendInvestigatorNotification.match, worker);
}
