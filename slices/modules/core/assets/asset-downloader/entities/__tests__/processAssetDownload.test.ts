import { combineReducers } from "@reduxjs/toolkit";
import { END } from "redux-saga";
import {
	createSagaTester,
	flush,
} from "../../../../../../shared/lib/test/createSagaTester";
import assetDownloadResume, {
	setInterrupted,
} from "../../shared/lib/store/assetDownloadResume";
import assetDownloader from "../../shared/lib/store/assetDownloader";
import {
	assetDownloadEnd,
	processAssetDownload,
} from "../processAssetDownload/processAssetDownload";
import type { processAssetDownloadSaga as ProcessAssetDownloadSaga } from "../processAssetDownload/processAssetDownloadSaga";

type MockDownload = {
	options: { url: string; resumeData?: string };
	emit: (item: unknown) => void;
	pause: jest.Mock;
};

const mockDownloads: MockDownload[] = [];

jest.mock("../processAssetDownload/downloadChannel", () => {
	const { eventChannel } = jest.requireActual("redux-saga");
	return {
		downloadChannel: (options: MockDownload["options"]) => {
			const download = { options, pause: jest.fn() } as unknown as MockDownload;
			const channel = eventChannel((emit: MockDownload["emit"]) => {
				download.emit = emit;
				return () => {};
			});
			mockDownloads.push(download);
			return { channel, pause: download.pause };
		},
	};
});

const mockFileSystem = {
	documentDirectory: "file:///docs/",
	getInfoAsync: jest.fn(),
	deleteAsync: jest.fn(),
};

jest.mock("expo-file-system", () => mockFileSystem);
jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/device/shared/lib", () =>
	jest.requireActual("@modules/core/device/shared/lib/store/actions"),
);
jest.mock("@modules/core/network/shared/lib", () =>
	jest.requireActual("@modules/core/network/shared/lib/store/actions/common"),
);

const { deviceAppStateChanged } = jest.requireActual(
	"@modules/core/device/shared/lib/store/actions",
);
const { internetReachabilityChanged } = jest.requireActual(
	"@modules/core/network/shared/lib/store/actions/common",
);

const reducer = combineReducers({ assetDownloader, assetDownloadResume });

const payload = (name: string) => ({
	url: `https://example.com/${name}.zip`,
	diskPath: `${name}.zip`,
});

// the resume mode is read on module load, so the saga is loaded per platform
const loadSaga = (os: "android" | "ios") => {
	let saga: typeof ProcessAssetDownloadSaga;

	jest.isolateModules(() => {
		const { Platform } = jest.requireActual("react-native");
		Platform.OS = os;
		saga =
			require("../processAssetDownload/processAssetDownloadSaga").processAssetDownloadSaga;
	});

	// biome-ignore lint/style/noNonNullAssertion: assigned synchronously above
	return saga!;
};

const setup = (
	os: "android" | "ios",
	interrupted: Record<string, string | null> = {},
) => {
	const tester = createSagaTester({ reducer });

	for (const [url, resumeData] of Object.entries(interrupted)) {
		tester.dispatch(setInterrupted({ url, resumeData }));
	}

	tester.run(loadSaga(os));

	const getInterrupted = () =>
		tester.getState().assetDownloadResume.interrupted;
	const ends = () =>
		tester
			.ofType(assetDownloadEnd.type)
			.map((action) => (action as ReturnType<typeof assetDownloadEnd>).payload);

	return { tester, getInterrupted, ends };
};

const succeed = (download: MockDownload, status = 200) => {
	download.emit({
		type: "result",
		value: { uri: download.options.url, status },
	});
	download.emit(END);
};

beforeEach(() => {
	mockDownloads.length = 0;
	jest.clearAllMocks();
	mockFileSystem.getInfoAsync.mockResolvedValue({ exists: false });
});

describe("processAssetDownload", () => {
	it("runs downloads one at a time", async () => {
		const { tester, ends } = setup("android");

		tester.dispatch(processAssetDownload(payload("a")));
		tester.dispatch(processAssetDownload(payload("b")));
		await flush();

		expect(mockDownloads.map(({ options }) => options.url)).toEqual([
			payload("a").url,
		]);

		succeed(mockDownloads[0]);
		await flush();

		expect(mockDownloads.map(({ options }) => options.url)).toEqual([
			payload("a").url,
			payload("b").url,
		]);
		expect(ends()).toEqual([
			expect.objectContaining({ url: payload("a").url, status: "success" }),
		]);
	});

	it("fails a paused download without a result", async () => {
		const { tester, ends } = setup("android");

		tester.dispatch(processAssetDownload(payload("a")));
		await flush();
		mockDownloads[0].emit({ type: "result" });
		await flush();

		expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
	});

	describe("android", () => {
		it("resumes an interrupted download from the partial file size", async () => {
			const { url } = payload("a");
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester, getInterrupted } = setup("android", { [url]: null });

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			expect(mockDownloads[0].options.resumeData).toBe("123");

			succeed(mockDownloads[0]);
			await flush();

			expect(getInterrupted()).toEqual({});
		});

		it("starts over when the download was not interrupted", async () => {
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester } = setup("android");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			expect(mockDownloads[0].options.resumeData).toBeUndefined();
		});

		it("marks the download interrupted on a network error", async () => {
			const { tester, getInterrupted, ends } = setup("android");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			mockDownloads[0].emit({ type: "error", value: new Error("offline") });
			await flush();

			expect(getInterrupted()).toEqual({ [payload("a").url]: null });
			expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
			expect(mockFileSystem.deleteAsync).not.toHaveBeenCalled();
		});

		it("drops the partial file on an HTTP error", async () => {
			const { url } = payload("a");
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester, getInterrupted, ends } = setup("android", {
				[url]: null,
			});

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			succeed(mockDownloads[0], 416);
			await flush();

			expect(getInterrupted()).toEqual({});
			expect(mockFileSystem.deleteAsync).toHaveBeenCalledWith(
				"file:///docs/a.zip",
				{ idempotent: true },
			);
			expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
		});

		it("does not pause: the partial file is enough", async () => {
			const { tester } = setup("android");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			tester.dispatch(deviceAppStateChanged("background"));
			await flush();

			expect(mockDownloads[0].pause).not.toHaveBeenCalled();
		});
	});

	describe("ios", () => {
		it.each([
			["the app goes to background", deviceAppStateChanged("background")],
			["the internet is lost", internetReachabilityChanged(false)],
		])("pauses and keeps the resume data when %s", async (_, trigger) => {
			const { url } = payload("a");
			const { tester, getInterrupted, ends } = setup("ios");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			mockDownloads[0].pause.mockResolvedValue({ resumeData: "blob" });
			tester.dispatch(trigger);
			await flush();

			expect(mockDownloads[0].pause).toHaveBeenCalledTimes(1);
			expect(getInterrupted()).toEqual({ [url]: "blob" });
			expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
		});

		it("ignores other app state changes", async () => {
			const { tester } = setup("ios");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			tester.dispatch(deviceAppStateChanged("active"));
			tester.dispatch(internetReachabilityChanged(true));
			await flush();

			expect(mockDownloads[0].pause).not.toHaveBeenCalled();
		});

		it("resumes with the stored blob and clears it on success", async () => {
			const { url } = payload("a");
			const { tester, getInterrupted } = setup("ios", { [url]: "blob" });

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			expect(mockDownloads[0].options.resumeData).toBe("blob");
			expect(mockFileSystem.getInfoAsync).not.toHaveBeenCalled();

			succeed(mockDownloads[0]);
			await flush();

			expect(getInterrupted()).toEqual({});
		});

		it("drops a blob that failed to resume", async () => {
			const { url } = payload("a");
			const { tester, getInterrupted } = setup("ios", { [url]: "stale" });

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			mockDownloads[0].emit({
				type: "error",
				value: new Error("no temp file"),
			});
			await flush();

			expect(getInterrupted()).toEqual({});
		});

		it("starts over after an error without a pause", async () => {
			const { tester, getInterrupted } = setup("ios");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			mockDownloads[0].emit({ type: "error", value: new Error("offline") });
			await flush();

			expect(getInterrupted()).toEqual({});
		});
	});
});
