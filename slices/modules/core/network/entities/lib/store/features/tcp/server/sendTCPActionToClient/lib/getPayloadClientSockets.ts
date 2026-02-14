import {
	getTCPClientSocket,
	getTCPClientSockets,
} from "@modules/core/network/shared/lib";
import { propEq } from "ramda";
import type TcpSocket from "react-native-tcp-socket";
import type { SendTCPActionToClientPayload } from "../sendTCPActionToClient";

export const getPayloadClientSockets = (
	payload: SendTCPActionToClientPayload,
): TcpSocket.Socket[] => {
	return getAllSockets(payload).filter(propEq(false, "destroyed"));
};

const getAllSockets = (
	payload: SendTCPActionToClientPayload,
): TcpSocket.Socket[] => {
	if (payload.type === "single") {
		const socket = getTCPClientSocket(payload.networkId);

		return socket ? [socket] : [];
	}

	const except = payload.except ?? [];
	const exceptSockets = except.map(getTCPClientSocket);

	return getTCPClientSockets().filter(
		(socket) => !exceptSockets.includes(socket),
	);
};
