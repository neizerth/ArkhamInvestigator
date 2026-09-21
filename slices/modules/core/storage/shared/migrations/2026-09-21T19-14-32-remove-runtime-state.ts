import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	app?: unknown;
	assetDownloader?: unknown;
	modal?: unknown;
	networkClient?: unknown;
};

/**
 * These keys were added to the persist blacklist: drop the stored values,
 * otherwise they would be restored once more after the update.
 */
export default function removeRuntimeState(state?: State) {
	if (!state) {
		return;
	}

	const { app, assetDownloader, modal, networkClient, ...rest } = state;

	return rest;
}
