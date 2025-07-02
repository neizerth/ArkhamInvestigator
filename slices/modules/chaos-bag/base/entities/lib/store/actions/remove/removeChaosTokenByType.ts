import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveChaosTokenByTypePayload = {
	type: ChaosTokenType;
};

export const removeChaosTokenByType =
	createAction<RemoveChaosTokenByTypePayload>(
		`${chaosBagPrefix}/removeTokenByType`,
	);

export type ChaosTokenRemovedByTypePayload = {
	id: string;
};

export const chaosTokenRemovedByType =
	createAction<ChaosTokenRemovedByTypePayload>(
		`${chaosBagPrefix}/tokenRemovedByType`,
	);
