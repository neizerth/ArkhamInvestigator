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

// jest-expo leaves Platform.Version undefined, while shared/config/device parses it on load
{
	const { Platform } = require("react-native");
	if (Platform.Version === undefined) {
		Object.defineProperty(Platform, "Version", {
			get: () => (Platform.OS === "ios" ? "18.0" : 35),
			configurable: true,
		});
	}
}

jest.mock("react-native-haptic-feedback", () => ({
	__esModule: true,
	default: { trigger: jest.fn() },
	trigger: jest.fn(),
	HapticFeedbackTypes: new Proxy({}, { get: (_, key) => key }),
}));

jest.mock("expo-audio", () => ({
	useAudioPlayer: () => ({
		play: jest.fn(),
		pause: jest.fn(),
		seekTo: jest.fn(),
		volume: 1,
	}),
	createAudioPlayer: () => ({
		play: jest.fn(),
		pause: jest.fn(),
		seekTo: jest.fn(),
		remove: jest.fn(),
	}),
	setAudioModeAsync: jest.fn(),
}));
