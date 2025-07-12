import {
	SkillCheckModalId,
	skillCheckItemChangeModalActionId as actionId,
} from "@modules/board/skill-check/entities/config";
import type { SkillCheckConfirmPayload } from "@modules/board/skill-check/entities/model";
import { updateSkillCheckHistoryItem as updateItem } from "@modules/board/skill-check/shared/lib";
import { createPromptModalActionFilter } from "@modules/core/modal/shared/prompt/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createPromptModalActionFilter({
	actionId,
	modalId: SkillCheckModalId.pin,
});

type Payload = SkillCheckConfirmPayload;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { value } = payload;

	if (!payload.modalAction?.data) {
		return;
	}

	const { data } = payload.modalAction;

	const { boardId, itemId } = data;

	yield put(
		updateItem({
			boardId,
			id: itemId,
			title: value,
			pinned: true,
		}),
	);
}

export function* processSkillCheckPinSaga() {
	yield takeEvery(filterAction, worker);
}
