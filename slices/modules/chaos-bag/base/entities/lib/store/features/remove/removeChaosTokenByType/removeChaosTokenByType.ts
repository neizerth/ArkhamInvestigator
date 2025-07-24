import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveChaosTokenByTypePayload = Partial<PropsWithBoardId> & {
	type: ChaosTokenType;
};

export const removeChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/removeTokenByType`,
	);

export const singleChaosTokenRemovedByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/singleTokenRemovedByType`,
	);

export const cantRemoveChaosToken = createAction<RemoveChaosTokenByTypePayload>(
	`${chaosBagPrefix}/cantRemoveToken`,
);
