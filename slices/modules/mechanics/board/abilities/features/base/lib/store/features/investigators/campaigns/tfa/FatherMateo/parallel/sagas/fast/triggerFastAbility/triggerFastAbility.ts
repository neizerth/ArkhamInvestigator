import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const triggerFastAbility = createAction<PropsWithBoardId>(
	"ParallelFatherMateo/triggerFastAbility",
);
