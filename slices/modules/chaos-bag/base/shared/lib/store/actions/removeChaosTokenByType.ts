import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosTokenType } from "../../../model";

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
