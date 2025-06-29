import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosTokenType } from "../../../model";

export type RemoveChaosTokenByTypePayload = PropsWithBoardId & {
	type: ChaosTokenType;
	count: number;
};

export const removeChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/removeTokenByType`,
	);

export const chaosTokenRemovedByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/tokenRemovedByType`,
	);
