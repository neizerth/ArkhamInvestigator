/**
 * `@shared/lib` without hooks, UI and HOCs: sagas need only utils, while the index pulls the whole UI.
 * Usage: `jest.mock("@shared/lib", () => require("@shared/lib/test/mocks").sharedLibMock());`
 */
export const sharedLibMock = () => ({
	...jest.requireActual("@shared/lib/util"),
	...jest.requireActual("@shared/lib/store"),
});

/**
 * `expo-file-system` (legacy async API) with every call stubbed.
 * Usage: `jest.mock("expo-file-system", () => require("@shared/lib/test/mocks").fileSystemMock());`
 * then `import * as FileSystem from "expo-file-system"` in the test to program the stubs.
 * The module path in `jest.mock` is the only thing an SDK bump changes (`expo-file-system/legacy`).
 */
export const fileSystemMock = () => ({
	documentDirectory: "file:///docs/",
	cacheDirectory: "file:///cache/",
	EncodingType: { UTF8: "utf8", Base64: "base64" },
	getInfoAsync: jest.fn(),
	readAsStringAsync: jest.fn(),
	writeAsStringAsync: jest.fn(),
	deleteAsync: jest.fn(),
	makeDirectoryAsync: jest.fn(),
	readDirectoryAsync: jest.fn(),
	getFreeDiskStorageAsync: jest.fn(),
	createDownloadResumable: jest.fn(),
});
