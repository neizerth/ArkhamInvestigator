import type {
	NetworkIncomeActionMeta,
	TCPIncomeAction,
	TCPIncomeActionMeta,
} from "@modules/core/network/shared/model";
import type TcpSocket from "react-native-tcp-socket";

type TCPIncomeActionInput<T extends string, P> = {
	type: T;
	payload: P;
	meta: NetworkIncomeActionMeta;
};

export function createTCPIncomeAction<T extends string, P = unknown>(
	action: TCPIncomeActionInput<T, P>,
	socket: TcpSocket.Socket,
): TCPIncomeAction<P> {
	const meta: TCPIncomeActionMeta = {
		...action.meta,
		notify: "self",
		source: "tcp",
		socket,
	};

	return {
		type: action.type,
		payload: action.payload,
		meta,
	};
}
