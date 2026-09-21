import removeRuntimeState from "../2026-09-21T19-14-32-remove-runtime-state";

describe("removeRuntimeState", () => {
	it("drops blacklisted keys and keeps the rest", () => {
		const state = {
			_persist: { version: 31, rehydrated: false },
			app: { appLoaded: true },
			assetDownloader: { assetUrl: "url" },
			modal: { modalId: "id" },
			networkClient: { ids: [], entities: {} },
			theme: { artworkUrl: "url" },
		};

		expect(removeRuntimeState(state)).toEqual({
			_persist: state._persist,
			theme: state.theme,
		});
	});

	it("passes an empty state through", () => {
		expect(removeRuntimeState(undefined)).toBeUndefined();
	});
});
