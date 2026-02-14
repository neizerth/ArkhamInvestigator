import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type TcpSocket from "react-native-tcp-socket";

export type SendTCPActionPayload = {
	socket: TcpSocket.Socket;
	action: NetworkOutcomeAction<unknown>;
	messageId: string;
};

export const sendTCPAction = createAction<SendTCPActionPayload>(
	"network/sendTCPAction",
);

export type SendTCPActionFailedPayload = SendTCPActionPayload &
	(
		| {
				type: "error";
				error: Error;
		  }
		| {
				type: "socket-destroyed";
		  }
		| {
				type: "unknown";
				error: unknown;
		  }
	);
export const sendTCPActionFailed = createAction<SendTCPActionFailedPayload>(
	"network/sendTCPActionFailed",
);
