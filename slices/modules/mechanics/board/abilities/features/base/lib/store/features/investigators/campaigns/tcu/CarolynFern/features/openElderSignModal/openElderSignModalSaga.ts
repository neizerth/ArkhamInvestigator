import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { whereReferencePartTokenEq } from "@modules/chaos-bag/effect/entities/lib";
import { chaosTokensRevealed } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { I18NText } from "@modules/core/i18n/shared/model";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { whereId } from "@shared/lib";
import { prop } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { healModalActionId, modalId } from "../../config";

const filterRevealedTokens = (action: unknown) => {
	if (!chaosTokensRevealed.match(action)) {
		return false;
	}
	const { payload } = action;
	const { tokens, code } = payload;

	if (code === InvesigatorCode.CarolynFern) {
		return true;
	}

	return tokens.some(({ type }) => type === "elderSign");
};

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;
	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	const selectedBoards = boards.filter(({ value, baseValue }) => {
		return value.sanity < baseValue.sanity;
	});

	const boardIds = selectedBoards.map(prop("id"));
	const board = boards.find(whereId(boardId));

	if (!board || boardIds.length === 0) {
		return;
	}

	const { investigator } = board;
	const reference = investigator.tokens_reference.find(
		whereReferencePartTokenEq("elderSign"),
	);

	const title: I18NText = {
		i18nKey: "chaosToken.effect",
		data: {
			token: chaosToken.character.elderSign,
		},
	};
	const subtitle = board.investigator.name;
	const text = reference?.effect || "";
	const actions: BaseModalAction[] = [
		createCancelModalAction(),
		createConfirmModalAction({
			id: healModalActionId,
			title: "ability.carolyn.modal.heal",
			icon: "sanity",
		}),
	];

	const id = modalId;

	yield put(
		openBoardSelectModal({
			id,
			data: {
				faction: "guardian",
				title,
				subtitle,
				boardIds,
				text,
				actions,
			},
			value: boardIds[0],
		}),
	);
}

export function* openElderSignModalSaga() {
	yield takeEvery(filterRevealedTokens, worker);
}
