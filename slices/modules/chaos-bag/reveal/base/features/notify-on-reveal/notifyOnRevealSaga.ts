import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { chaosTokensRevealed } from "@modules/chaos-bag/reveal/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;
	const currentBoard: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	console.log({
		boardId,
		currentBoardId: currentBoard.id,
	});

	if (currentBoard.id === boardId) {
		return;
	}

	const tokens = payload.tokens.map((token) => {
		const character = chaosToken.character[token.type];

		return character;
	});

	const token = tokens.length > 1 ? null : payload.tokens[0].type;

	yield put(
		sendInvestigatorNotification({
			remote: false,
			boardId,
			message: "chaosBag.tokensRevealed",
			data: {
				count: tokens.length,
				tokens: tokens.join(", "),
			},
			token,
		}),
	);
}

export function* notifyOnRevealSaga() {
	yield takeEvery(chaosTokensRevealed.match, worker);
}
