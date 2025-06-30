import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";

export type RemoveChaosTokenPayload = {
	id: string;
};

export const removeChaosToken = createAction<RemoveChaosTokenPayload>(
	`${chaosBagPrefix}/removeToken`,
);

export const chaosTokenRemoved = createAction<RemoveChaosTokenPayload>(
	`${chaosBagPrefix}/tokenRemoved`,
);
