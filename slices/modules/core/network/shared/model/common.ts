import type { NetInfoStateType } from "@react-native-community/netinfo";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GenericFunction } from "@shared/model";
import type TcpSocket from "react-native-tcp-socket";

export type NetworkType = keyof typeof NetInfoStateType;

export type NetworkRole = "client" | "host";

export type TCPActionMeta = {
	networkId: string;
	source: "tcp";
	socket: TcpSocket.Socket;
};

export type TCPAction<
	P = void,
	T extends string = string,
	E = never,
> = PayloadAction<P, T, TCPActionMeta, E>;

export type TCPReturnType<T extends GenericFunction> = ReturnType<T> & {
	meta: TCPActionMeta;
};

export type NetworkClient = {
	id: string;
	nickname: string;
};
