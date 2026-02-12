import { createAction } from "@reduxjs/toolkit";
import { withRemoteMeta } from "../../../logic";

export type TcpActionReceivedPayload = {
	messageId: string;
	type: string;
	/** Маршрутизация подтверждения на сокет отправителя (сервер → клиент). */
	targetNetworkId?: string;
};

export const tcpActionReceived = createAction(
	"network/tcpActionReceived",
	withRemoteMeta<TcpActionReceivedPayload>({
		notify: "reciever",
	}),
);
