import type { NetInfoState } from "@react-native-community/netinfo";
import { createAction } from "@reduxjs/toolkit";

export const checkNetwork = createAction("network/checkNetwork");

// FIXED (found 2026-09-28, unreported/unnoticed bug): this used to share the exact same type
// string as `checkNetwork` above (copy-paste typo). Since `checkNetworkSaga` listens for
// `checkNetwork.match` and its worker dispatches `networkChecked(...)`, the identical type meant
// every dispatch of `networkChecked` also matched `checkNetwork.match` — re-triggering the saga's
// worker, which fetches again and dispatches `networkChecked` again, forever. `checkNetwork()` is
// never actually dispatched anywhere in the app currently (confirmed by grep), so this infinite
// loop never fired in production — but it's a live landmine for whenever that changes, and it hung
// a saga test outright the moment something actually dispatched `checkNetwork()`.
export const networkChecked = createAction<NetInfoState>(
	"network/networkChecked",
);
