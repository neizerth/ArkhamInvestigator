import { selectDeclensedSignatureName } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { getSignatureImageUrl } from "@modules/signature/shared/api";
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

	const { name } = board.investigator;
	const payloadData = payload.data || {};

	const faction = getBoardFaction(board);
	const sourceFaction = sourceBoard && getBoardFaction(sourceBoard);

	const data = {
		...payloadData,
		dativeName,
		name,
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
