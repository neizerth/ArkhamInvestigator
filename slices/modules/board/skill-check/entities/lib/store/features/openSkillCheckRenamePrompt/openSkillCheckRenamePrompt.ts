import { SkillCheckModalId } from "@modules/board/skill-check/entities/config";
import type { AppThunk } from "@shared/model";
import {
	type OpenSkillCheckPromptPayload,
	openSkillCheckPrompt,
} from "../openSkillCheckPrompt";

export type Payload = Omit<OpenSkillCheckPromptPayload, "id">;

export const openSkillCheckRenamePrompt =
	(payload: Payload): AppThunk =>
	(dispatch) =>
		dispatch(
			openSkillCheckPrompt({
				...payload,
				id: SkillCheckModalId.setTitle,
			}),
		);
