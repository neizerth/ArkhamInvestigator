import { NativeModules, Platform } from "react-native";

// #region agent log
fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		location: "bootstrap.ts:6",
		message: "bootstrap starting",
		data: { platform: Platform.OS },
		timestamp: Date.now(),
		sessionId: "debug-session",
		runId: "init",
		hypothesisId: "A",
	}),
}).catch(() => {});
// #endregion

// Ensure the ChaosOdds module loads on native platforms
// JSI bindings are installed via ChaosOddsJSIModule (RCT module)
// which is automatically registered via RCT_EXPORT_MODULE
if (Platform.OS === "ios") {
	// Access the native module to ensure it gets loaded and initialized
	// This will trigger setBridge: and install the JSI bindings
	try {
		// #region agent log
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "bootstrap.ts:11",
				message: "accessing NativeModules.ChaosOddsJSI",
				data: { allModules: Object.keys(NativeModules) },
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "init",
				hypothesisId: "A",
			}),
		}).catch(() => {});
		// #endregion
		const ChaosOddsJSI = NativeModules.ChaosOddsJSI;
		// #region agent log
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "bootstrap.ts:15",
				message: "ChaosOddsJSI result",
				data: {
					found: !!ChaosOddsJSI,
					type: typeof ChaosOddsJSI,
					hasInitialize: !!(
						ChaosOddsJSI && typeof ChaosOddsJSI.initialize === "function"
					),
				},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "init",
				hypothesisId: "A",
			}),
		}).catch(() => {});
		// #endregion
		if (ChaosOddsJSI) {
			// Call initialize to ensure the module is fully initialized
			if (typeof ChaosOddsJSI.initialize === "function") {
				// #region agent log
				fetch(
					"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							location: "bootstrap.ts:21",
							message: "calling initialize",
							data: {},
							timestamp: Date.now(),
							sessionId: "debug-session",
							runId: "init",
							hypothesisId: "A",
						}),
					},
				).catch(() => {});
				// #endregion
				ChaosOddsJSI.initialize();
			}
		} else if (__DEV__) {
			console.warn("ChaosOdds: Native module not found");
			// #region agent log
			fetch(
				"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "bootstrap.ts:26",
						message: "module not found warning",
						data: {},
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "init",
						hypothesisId: "A",
					}),
				},
			).catch(() => {});
			// #endregion
		}
	} catch (error) {
		if (__DEV__) {
			console.warn("ChaosOdds: Error loading native module", error);
			// #region agent log
			fetch(
				"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "bootstrap.ts:31",
						message: "error loading module",
						data: { error: String(error) },
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "init",
						hypothesisId: "A",
					}),
				},
			).catch(() => {});
			// #endregion
		}
	}
}
