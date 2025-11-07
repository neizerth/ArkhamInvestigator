import { selectBoardById } from "@modules/board/base/shared/lib";
import { selectCanRemoveChaosTokens } from "@modules/chaos-bag/base/entities/lib";
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
	code: InvesigatorCode.YukiYagami,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const validationSelector = selectCanRemoveChaosTokens({
		type: "curse",
		count: 1,
	});

	const validation: ReturnType<typeof validationSelector> =
		yield select(validationSelector);

	if (!validation.canRemove) {
		return;
	}

	yield put(
		openConfirm({
			id: modalId,
			data: {
				faction: "guardian",
				title: "ability.yuki.modal.title",
				subtitle: board.investigator.name,
				text: "ability.yuki.modal.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: modalActionId,
					}),
				],
			},
		}),
	);
}

export function* YukiYagamiOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
