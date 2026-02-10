import { type PayloadAction, createAction } from "@reduxjs/toolkit";

export type SendTCPClientActionPayload = {
	networkId: string;
	action: PayloadAction<unknown>;
};

export const sendTCPClientAction = createAction<SendTCPClientActionPayload>(
	"network/sendTCPClientAction",
);
