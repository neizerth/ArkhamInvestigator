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

export const removeSingleChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/removeTokenByType`,
	);

export const singleChaosTokenRemovedByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/singleTokenRemovedByType`,
	);

export type CantRemoveSingleChaosTokenByTypePayload =
	RemoveChaosTokenByTypePayload & {
		available: number;
	};

export const cantRemoveSingleChaosTokenByType =
	createAction<CantRemoveSingleChaosTokenByTypePayload>(
		`${chaosBagPrefix}/cantRemoveTokenByType`,
	);
