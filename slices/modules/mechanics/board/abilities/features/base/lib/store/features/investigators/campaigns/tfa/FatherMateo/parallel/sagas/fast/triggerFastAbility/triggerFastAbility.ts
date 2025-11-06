import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type Payload = PropsWithBoardId & {
	modalId: string;
};

export const triggerFastAbility = createAction<Payload>(
	"ParallelFatherMateo/triggerFastAbility",
);
