import { createAction } from "@reduxjs/toolkit";
import { withRemoteMeta } from "../../../logic";

type TcpActionReceivedPayload = {
	messageId: string;
};

export const tcpActionReceived = createAction(
	"network/tcpActionReceived",
	withRemoteMeta<TcpActionReceivedPayload>({
		notify: "reciever",
	}),
);
