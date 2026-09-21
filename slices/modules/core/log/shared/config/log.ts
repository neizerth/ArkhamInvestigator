import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import {
	consoleTransport,
	fileAsyncTransport,
	logger,
} from "react-native-logs";

// `LOG_TCP` in `.env` → app.config.js `extra.logTcp` (default false).
export const LOG_TCP = Constants.expoConfig?.extra?.logTcp === true;

export const Log = logger.createLogger({
	transport: [fileAsyncTransport, consoleTransport],
	transportOptions: {
		FS: FileSystem,
		fileName: "logs_{date-today}.txt",
		fileNameDateType: "iso",
	},
});

// Prefer importing `log` from `@modules/core/log/shared/config`.
// `Log` is kept as an alias for older imports.
export const log = Log;

/** TCP/network debug chatter — silent unless `LOG_TCP=true`. */
export const tcpLog = Log.extend("tcp");

if (!LOG_TCP) {
	Log.disable("tcp");
}
