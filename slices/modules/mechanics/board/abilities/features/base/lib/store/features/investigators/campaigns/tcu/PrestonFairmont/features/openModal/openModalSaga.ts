import { selectIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.PrestonFairmont,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const abilityUseSelector = selectIsBoardAbilityUsed({
		boardId,
		abilityId: AbilityCode.PrestonFairmont.elderSign,
	});

	const isUsed: ReturnType<typeof abilityUseSelector> =
		yield select(abilityUseSelector);

	if (isUsed) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { resources } = board.value;

	if (resources < 2) {
		return;
	}

	yield put(
		openConfirm({
			id: modalId,
			data: {
				title: {
					i18nKey: "chaosToken.effect",
					data: {
						token: chaosToken.character.elderSign,
					},
				},
				subtitle: board.investigator.name,
				text: "ability.preston.modal.text",
				faction: "rogue",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: AbilityCode.PrestonFairmont.elderSign,
					}),
				],
			},
		}),
	);
}

export function* PrestonFairmontOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
