import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosTokenType } from "../../../model";

export type RemoveChaosTokenByTypePayload = PropsWithBoardId & {
	type: ChaosTokenType;
};

export const removeChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/removeTokenByType`,
	);

export type ChaosTokenRemovedByTypePayload = PropsWithBoardId & {
	id: string;
};

export const chaosTokenRemovedByType =
	createAction<ChaosTokenRemovedByTypePayload>(
		`${chaosBagPrefix}/tokenRemovedByType`,
	);
