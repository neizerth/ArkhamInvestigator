import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import {
	getBoardDamage,
	getBoardHorror,
} from "@modules/mechanics/board/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "../config";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.StellaClark,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const damage = getBoardDamage(board);
	const horror = getBoardHorror(board);

	if (damage === 0 && horror === 0) {
		return;
	}

	yield put(
		openConfirm({
			id: modalId,
			data: {
				faction: "survivor",
				title: {
					i18nKey: "chaosToken.effect",
					data: {
						token: chaosToken.character.elderSign,
					},
				},
				text: "ability.stella.modal.text",
				subtitle: board.investigator.name,
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: modalActionId,
						icon: "auto_fail",
					}),
				],
			},
		}),
	);
}

export function* StellaClarkOpenElderSignModalSaga() {
	yield takeEvery(filterAction, worker);
}
