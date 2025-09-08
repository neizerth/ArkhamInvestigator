import { selectSkillCheckHistoryItem } from "@modules/board/skill-check/shared/lib";

import { selectBoardById } from "@modules/board/base/shared/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openPrompt } from "@modules/core/modal/shared/prompt/lib";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { skillCheckItemChangeModalActionId } from "../../../../config";
import { openSkillCheckPrompt } from "./openSkillCheckPrompt";

function* worker({ payload }: ReturnType<typeof openSkillCheckPrompt>) {
	const { id, itemId, boardId } = payload;

	const titleSelector = selectSkillCheckHistoryItem({
		boardId,
		id: itemId,
	});

	const item: ReturnType<typeof titleSelector> = yield select(titleSelector);

	if (!item) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const faction = getBoardFaction(board);

	const defaultValue = item.title;

	yield put(
		openPrompt({
			id,
			data: {
				title: "New Name",
				defaultValue,
				placeholder: "New Name",
				faction,
				inputProps: {
					maxLength: 20,
				},
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: skillCheckItemChangeModalActionId,
						data: {
							itemId,
							boardId,
						},
					}),
				],
			},
		}),
	);
}

export function* openSkillCheckPromptSaga() {
	yield takeEvery(openSkillCheckPrompt.match, worker);
}
