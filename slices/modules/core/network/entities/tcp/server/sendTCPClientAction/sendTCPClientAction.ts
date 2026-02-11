import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SendTCPClientActionPayload = {
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

export const sendTCPClientAction = createAction<SendTCPClientActionPayload>(
	"network/sendTCPClientAction",
);
