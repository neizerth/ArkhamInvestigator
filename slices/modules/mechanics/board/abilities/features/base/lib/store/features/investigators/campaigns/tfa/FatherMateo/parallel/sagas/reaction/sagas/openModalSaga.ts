import { selectBoardById } from "@modules/board/base/shared/lib";
import { revealChaosTokensInterrupted } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/revealChaosTokens";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "../config";

const filterAction = (action: unknown) => {
	if (!revealChaosTokensInterrupted.match(action)) {
		return false;
	}
	const { payload } = action;
	const [code] = payload.codes;
	return code === InvesigatorCode.FatherMateo.parallel;
};

function* worker({ payload }: ReturnType<typeof revealChaosTokensInterrupted>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	yield put(
		openConfirm({
			id: modalId,
			data: {
				title: "ability.mateo.parallel.reaction.title",
				subtitle: board.investigator.name,
				text: "ability.mateo.parallel.reaction.text",
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

export function* ParallelFatherMateoOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
