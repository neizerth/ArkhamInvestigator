import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { isRevealedTokenActive } from "@modules/chaos-bag/result/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { activateDiscipline } from "../activateDiscipline";
import { getModalActions } from "./getModalActions";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { allRevealedTokens } = action.payload;

	return allRevealedTokens
		.filter(isRevealedTokenActive)
		.some((token) => token.type === "elderSign");
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;
	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const actions: ConfirmModalAction[] =
		yield getModalActions(skillCheckBoardId);

	if (actions.length === 0) {
		return;
	}

	if (actions.length === 1) {
		const [action] = actions;

		yield put(
			activateDiscipline({
				boardId: skillCheckBoardId,
				abilityId: action.id,
			}),
		);
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
				text: "ability.lily.elderSign.confirm.text",
				subtitle: board.investigator.name,
				actions,
			},
		}),
	);
}

export function* LilyChenRevealEndModalSaga() {
	yield takeEvery(filterAction, worker);
}
