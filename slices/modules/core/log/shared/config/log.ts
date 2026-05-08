import * as FileSystem from "expo-file-system";
import {
	consoleTransport,
	fileAsyncTransport,
	logger,
} from "react-native-logs";

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
