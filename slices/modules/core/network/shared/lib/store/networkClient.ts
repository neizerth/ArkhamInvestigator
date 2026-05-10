import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import type { NetworkClient } from "../../model";

export const networkClientsAdapter = createEntityAdapter<NetworkClient>();

export const networkClient = createSlice({
	name: "networkClient",
	initialState: networkClientsAdapter.getInitialState(),
	reducers: {
		addNetworkClient: networkClientsAdapter.addOne,
		upsertNetworkClient: networkClientsAdapter.upsertOne,
		removeNetworkClient: networkClientsAdapter.removeOne,
		updateNetworkClient: networkClientsAdapter.updateOne,
		removeAllNetworkClients: networkClientsAdapter.removeAll,
	},
});

export const {
	addNetworkClient,
	upsertNetworkClient,
	removeNetworkClient,
	updateNetworkClient,
	removeAllNetworkClients,
} = networkClient.actions;

export const {
	selectById: selectNetworkClientById,
	selectIds: selectNetworkClientIds,
	selectAll: selectAllNetworkClients,
} = networkClientsAdapter.getSelectors(
	(state: RootState) => state.networkClient,
);

export default networkClient.reducer;
