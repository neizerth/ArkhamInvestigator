import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { UpdateRevealedTokenInternalPayload } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type UpdateRevealedTokenPayload = UpdateRevealedTokenInternalPayload &
	Partial<PropsWithBoardId>;

export const updateRevealedToken = createAction<UpdateRevealedTokenPayload>(
	`${chaosBagRevealPrefix}/updateRevealedToken`,
);

export type RevealedTokenUpdated = Omit<UpdateRevealedTokenPayload, "id"> & {
	token: ChaosBagToken;
};

export const revealedTokenUpdated = createAction<RevealedTokenUpdated>(
	`${chaosBagRevealPrefix}/revealedTokenUpdated`,
);
