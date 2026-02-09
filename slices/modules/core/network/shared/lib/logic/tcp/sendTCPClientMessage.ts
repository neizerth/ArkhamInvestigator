import { tcpSocketMap } from "../../../config";

type Options = {
	boardNetworkId: string;
	message: string;
};

export const sendTCPClientMessage = ({ boardNetworkId, message }: Options) => {
	const socket = tcpSocketMap.get(boardNetworkId);
	if (!socket) {
		throw new Error(`Socket not found for board network id: ${boardNetworkId}`);
	}

	socket.write(message);
};
