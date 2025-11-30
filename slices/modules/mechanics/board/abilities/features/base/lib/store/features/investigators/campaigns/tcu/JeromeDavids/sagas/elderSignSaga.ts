import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "../config";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.JeromeDavids,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	yield put(
		openConfirm({
			id: modalId,
			data: {
				title: "ability.jerome.elderSign.title",
				subtitle: board.investigator.name,
				text: "ability.jerome.elderSign.text",
				actions: [
					createCancelModalAction({
						title: "No",
					}),
					createConfirmModalAction({
						id: modalActionId,
						title: "Yes",
					}),
				],
			},
		}),
	);
}

export function* JeromeDavidsElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
