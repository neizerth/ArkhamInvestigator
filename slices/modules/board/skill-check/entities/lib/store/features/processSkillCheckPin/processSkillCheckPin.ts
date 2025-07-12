import { SkillCheckModalId } from "@modules/board/skill-check/entities/config";
import {
	selectSkillCheckHistoryItem,
	toggleSkillCheckHistoryItemPin,
} from "@modules/board/skill-check/shared/lib";
import type { AppThunk } from "@shared/model";
import { shouldOpenSkillCheckHistoryItemPrompt as shouldOpenPrompt } from "../../../logic";
import {
	type OpenSkillCheckPromptPayload,
	openSkillCheckPrompt,
} from "../openSkillCheckPrompt";

export type Payload = Omit<OpenSkillCheckPromptPayload, "id">;

export const processSkillCheckPin =
	(payload: Payload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const { itemId, boardId } = payload;
		const item = selectSkillCheckHistoryItem({
			id: itemId,
			boardId,
		})(state);

		if (!item) {
			return;
		}

		if (shouldOpenPrompt(item)) {
			dispatch(
				openSkillCheckPrompt({
					...payload,
					id: SkillCheckModalId.pin,
				}),
			);
			return;
		}

		dispatch(
			toggleSkillCheckHistoryItemPin({
				id: itemId,
				boardId,
			}),
		);
	};
