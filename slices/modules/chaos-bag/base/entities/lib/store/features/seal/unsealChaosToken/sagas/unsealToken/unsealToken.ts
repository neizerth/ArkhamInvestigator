import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type UnsealTokenPayload = PropsWithBoardId & {
	token: ChaosBagToken;
};

export const unsealToken = createAction<UnsealTokenPayload>(
	`${chaosBagPrefix}/unsealTokenInternal`,
);
