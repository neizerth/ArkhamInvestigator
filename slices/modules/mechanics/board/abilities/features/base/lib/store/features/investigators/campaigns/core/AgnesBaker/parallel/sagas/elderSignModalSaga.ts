import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { getBoardDamage } from "@modules/mechanics/board/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "../config";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.AgnesBaker.parallel,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const damage = getBoardDamage(board);

	if (damage === 0) {
		return;
	}

	yield put(
		openConfirm({
			id: modalId,
			data: {
				faction: "mystic",
				title: {
					i18nKey: "chaosToken.effect",
					data: {
						token: chaosToken.character.elderSign,
					},
				},
				subtitle: board.investigator.name,
				text: "ability.agnes.parallel.modal.text",
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

export function* ParallelAgnesBakerElderSignModalSaga() {
	yield takeEvery(filterAction, worker);
}
