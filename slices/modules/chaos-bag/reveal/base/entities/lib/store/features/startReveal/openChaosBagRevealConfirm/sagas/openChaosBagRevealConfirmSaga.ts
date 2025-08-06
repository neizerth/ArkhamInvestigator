import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { selectBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { continueModalActionId, modalId } from "../config";
import { openChaosBagRevealConfirm } from "../openChaosBagRevealConfirm";
import { selectSkillCheckText } from "../selectSkillCheckText";

function* worker({ payload }: ReturnType<typeof openChaosBagRevealConfirm>) {
	const factionSelector = selectBoardFaction(payload.boardId);
	const faction: ReturnType<typeof factionSelector> =
		yield select(factionSelector);

	const skillCheck: ReturnType<typeof selectSkillCheckText> =
		yield select(selectSkillCheckText);

	yield put(
		openConfirm({
			id: modalId,
			data: {
				faction,
				title: "reveal.startNewConfirm.title",
				text: {
					i18nKey: "reveal.startNewConfirm.text",
					data: {
						skillCheck,
					},
				},
				actions: [
					createCancelModalAction({
						title: "reveal.startNewConfirm.startNew",
						icon: "chaos-bag-thin",
						data: payload,
					}),
					createConfirmModalAction({
						id: continueModalActionId,
						title: "Continue",
					}),
				],
			},
		}),
	);
}

export function* openChaosBagRevealConfirmSaga() {
	yield takeEvery(openChaosBagRevealConfirm.match, worker);
}
