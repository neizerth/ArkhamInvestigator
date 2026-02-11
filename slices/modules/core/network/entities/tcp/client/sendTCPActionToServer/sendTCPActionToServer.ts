import { createAction } from "@reduxjs/toolkit";
import type { SendTCPActionPayload } from "../../sendTCPAction";

export type SendTCPActionToServerPayload = Omit<SendTCPActionPayload, "socket">;

export const sendTCPActionToServer = createAction<SendTCPActionToServerPayload>(
	"network/sendTCPActionToServer",
);
