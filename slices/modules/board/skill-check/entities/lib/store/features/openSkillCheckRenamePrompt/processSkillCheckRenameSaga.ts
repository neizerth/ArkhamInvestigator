import {
	SkillCheckModalId,
	skillCheckItemChangeModalActionId as actionId,
} from "@modules/board/skill-check/entities/config";
import type { SkillCheckConfirmPayload } from "@modules/board/skill-check/entities/model";
import { updateSkillCheckHistoryItem } from "@modules/board/skill-check/shared/lib";
import { createPromptModalActionFilter } from "@modules/core/modal/shared/prompt/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createPromptModalActionFilter({
	actionId,
	modalId: SkillCheckModalId.setTitle,
});

type Payload = SkillCheckConfirmPayload;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { value } = payload;

	if (!payload.modalAction?.data) {
		return;
	}

	const { data } = payload.modalAction;

	yield put(
		updateSkillCheckHistoryItem({
			id: data.itemId,
			boardId: data.boardId,
			title: value,
			...(!value ? { pinned: false } : {}),
		}),
	);
}

export function* processSkillCheckRenameSaga() {
	yield takeEvery(filterAction, worker);
}
