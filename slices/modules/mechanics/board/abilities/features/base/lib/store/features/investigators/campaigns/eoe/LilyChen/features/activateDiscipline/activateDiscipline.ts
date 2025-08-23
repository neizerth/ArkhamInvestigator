import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type ActivateDisciplinePayload = PropsWithBoardId & {
	abilityId: string;
};

export const activateDiscipline = createAction<ActivateDisciplinePayload>(
	"LilyChen/activateDiscipline",
);
