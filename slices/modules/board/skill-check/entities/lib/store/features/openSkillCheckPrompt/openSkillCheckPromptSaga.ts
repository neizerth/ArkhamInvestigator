import { selectSkillCheckHistoryItem } from "@modules/board/skill-check/shared/lib";
import { openBoardModal } from "@modules/core/modal/entities/lib";

import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
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

	const defaultValue = item.title;

	yield put(
		openBoardModal({
			id,
			boardId,
			type: "prompt",
			data: {
				title: "New Name",
				defaultValue,
				placeholder: "New Name",
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
