import type { NetInfoStateType } from "@react-native-community/netinfo";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GenericFunction } from "@shared/model";

export type NetworkType = keyof typeof NetInfoStateType;

export type NetworkRole = "client" | "host";

export type NetworkOutcomeAction<
	P = void,
	T extends string = string,
	E = never,
> = PayloadAction<P, T, NetworkOutcomeActionMeta, E>;

export type NetworkClient = {
	id: string;
	nickname: string;
};

export type NetworkNotificationType = "host" | "all";

export type NetworkIncomeActionMeta = {
	networkId: string;
	notify: NetworkNotificationType;
};

export type NetworkOutcomeActionMeta = {
	notify: NetworkNotificationType;
	remote: true;
};

export type RemoteActionReturnType<T extends GenericFunction> =
	ReturnType<T> & {
		meta: NetworkOutcomeActionMeta;
	};
