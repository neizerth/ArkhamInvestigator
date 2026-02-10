import { createAction } from "@reduxjs/toolkit";
import type { SendTCPActionPayload } from "../../sendTCPAction";

export type SendTCPServerActionPayload = Omit<SendTCPActionPayload, "socket">;

export const sendTCPServerAction = createAction<SendTCPServerActionPayload>(
	"network/sendTCPServerAction",
);
