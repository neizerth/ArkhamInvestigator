// Native modules are not available in Jest: use the mocks shipped by the libraries.
jest.mock("react-native-localize", () => require("react-native-localize/mock"));
jest.mock("@react-native-async-storage/async-storage", () =>
	require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
jest.mock("@react-native-community/netinfo", () =>
	require("@react-native-community/netinfo/jest/netinfo-mock"),
);

jest.mock("react-native-tcp-socket", () => ({
	createServer: jest.fn(),
	createConnection: jest.fn(),
	Server: jest.fn(),
	Socket: jest.fn(),
}));

// silent loggers: sagas log a lot, tests check actions instead
jest.mock("@modules/core/log/shared/config", () => {
	const createLogger = () => ({
		debug: jest.fn(),
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn(),
		extend: () => createLogger(),
	});
	const Log = createLogger();
	return { LOG_TCP: false, Log, log: Log, tcpLog: createLogger() };
});
