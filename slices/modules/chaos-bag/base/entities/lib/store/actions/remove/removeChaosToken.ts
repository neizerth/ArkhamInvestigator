import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type RemoveChaosTokenPayload = {
	id: string;
};

export const removeChaosToken = createAction<RemoveChaosTokenPayload>(
	`${chaosBagPrefix}/removeToken`,
);

export const chaosTokenRemoved = createAction<RemoveChaosTokenPayload>(
	`${chaosBagPrefix}/tokenRemoved`,
);
