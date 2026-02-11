import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SendTCPActionToClientPayload = {
	action: NetworkOutcomeAction<unknown>;
} & (
	| {
			type?: "all";
	  }
	| {
			type: "single";
			networkId: string;
	  }
);

export const sendTCPActionToClient = createAction<SendTCPActionToClientPayload>(
	"network/sendTCPActionToClient",
);
