import {
	selectBoardById,
	selectInvestigatorBoards,
} from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { whereReferencePartTokenEq } from "@modules/chaos-bag/effect/entities/lib";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import type { I18NText } from "@modules/core/i18n/shared/model";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { prop } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { healModalActionId, modalId } from "../../config";

const filterRevealedTokens = createRevealedTokenFilterAction({
	code: InvesigatorCode.CarolynFern,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;
	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	const selectedBoards = boards.filter(({ value, baseValue }) => {
		return value.sanity < baseValue.sanity;
	});

	const boardIds = selectedBoards.map(prop("id"));

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

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

export function* CarolynFernOpenElderSignModalSaga() {
	yield takeEvery(filterRevealedTokens, worker);
}
