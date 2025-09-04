import type { PropsWithAbility } from "@modules/board/abilities/shared/model";
import type {
	BoardId,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ChangeSkillValueToBaseIntellectPayload = PropsWithBoardId &
	PropsWithAbility & {
		targetBoardId: BoardId;
	};

export const changeSkillValueToBaseIntellect =
	createAction<ChangeSkillValueToBaseIntellectPayload>(
		"AliceLiddel/useIntellect",
	);
