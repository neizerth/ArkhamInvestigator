import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveChaosTokenByTypePayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
	type: ChaosTokenType;
};

export const removeChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/removeTokenByType`,
	);

export const processSingleChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/processRemoveTokenByType`,
	);

export const chaosTokenRemovedByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/tokenRemovedByType`,
	);
