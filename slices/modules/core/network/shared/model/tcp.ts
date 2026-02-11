import type { PayloadAction } from "@reduxjs/toolkit";
import type { GenericFunction } from "@shared/model";
import type TcpSocket from "react-native-tcp-socket";
import type { NetworkIncomeActionMeta } from "./common";

export type TCPIncomeActionMeta = NetworkIncomeActionMeta & {
	source: "tcp";
	socket: TcpSocket.Socket;
};

export type TCPIncomeAction<
	P = void,
	T extends string = string,
	E = never,
> = PayloadAction<P, T, TCPIncomeActionMeta, E>;

export type TCPIncomeReturnType<T extends GenericFunction> = ReturnType<T> & {
	meta: TCPIncomeActionMeta;
};
