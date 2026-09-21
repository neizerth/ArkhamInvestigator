import { combineReducers } from "@reduxjs/toolkit";
import { END } from "redux-saga";
import {
	createSagaTester,
	flush,
} from "../../../../../../shared/lib/test/createSagaTester";
import assetDownloadResume, {
	addInterruptedUrl,
} from "../../shared/lib/store/assetDownloadResume";
import assetDownloader from "../../shared/lib/store/assetDownloader";
import {
	assetDownloadEnd,
	processAssetDownload,
} from "../processAssetDownload/processAssetDownload";
import type { processAssetDownloadSaga as ProcessAssetDownloadSaga } from "../processAssetDownload/processAssetDownloadSaga";

type MockChannel = {
	options: { url: string; resumeData?: string };
	emit: (item: unknown) => void;
};

const mockChannels: MockChannel[] = [];

jest.mock("../processAssetDownload/downloadChannel", () => {
	const { eventChannel } = jest.requireActual("redux-saga");
	return {
		downloadChannel: (options: MockChannel["options"]) =>
			eventChannel((emit: MockChannel["emit"]) => {
				mockChannels.push({ options, emit });
				return () => {};
			}),
	};
});

const mockFileSystem = {
	documentDirectory: "file:///docs/",
	getInfoAsync: jest.fn(),
	deleteAsync: jest.fn(),
};

jest.mock("expo-file-system", () => mockFileSystem);

const reducer = combineReducers({ assetDownloader, assetDownloadResume });

const payload = (name: string) => ({
	url: `https://example.com/${name}.zip`,
	diskPath: `${name}.zip`,
});

// `canResume` is read on module load, so the saga is loaded per platform
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

const setup = (os: "android" | "ios", interruptedUrls: string[] = []) => {
	const tester = createSagaTester({ reducer });

	for (const url of interruptedUrls) {
		tester.dispatch(addInterruptedUrl(url));
	}

	tester.run(loadSaga(os));

	const interrupted = () =>
		tester.getState().assetDownloadResume.interruptedUrls;
	const ends = () =>
		tester
			.ofType(assetDownloadEnd.type)
			.map((action) => (action as ReturnType<typeof assetDownloadEnd>).payload);

	return { tester, interrupted, ends };
};

const succeed = (channel: MockChannel, status = 200) => {
	channel.emit({ type: "result", value: { uri: channel.options.url, status } });
	channel.emit(END);
};

beforeEach(() => {
	mockChannels.length = 0;
	jest.clearAllMocks();
	mockFileSystem.getInfoAsync.mockResolvedValue({ exists: false });
});

describe("processAssetDownload", () => {
	it("runs downloads one at a time", async () => {
		const { tester, ends } = setup("android");

		tester.dispatch(processAssetDownload(payload("a")));
		tester.dispatch(processAssetDownload(payload("b")));
		await flush();

		expect(mockChannels.map(({ options }) => options.url)).toEqual([
			payload("a").url,
		]);

		succeed(mockChannels[0]);
		await flush();

		expect(mockChannels.map(({ options }) => options.url)).toEqual([
			payload("a").url,
			payload("b").url,
		]);
		expect(ends()).toEqual([
			expect.objectContaining({ url: payload("a").url, status: "success" }),
		]);
	});

	describe("android", () => {
		it("resumes an interrupted download from the partial file size", async () => {
			const { url } = payload("a");
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester, interrupted } = setup("android", [url]);

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			expect(mockChannels[0].options.resumeData).toBe("123");

			succeed(mockChannels[0]);
			await flush();

			expect(interrupted()).toEqual([]);
		});

		it("starts over when the download was not interrupted", async () => {
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester } = setup("android");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			expect(mockChannels[0].options.resumeData).toBeUndefined();
		});

		it("marks the download interrupted on a network error", async () => {
			const { tester, interrupted, ends } = setup("android");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			mockChannels[0].emit({ type: "error", value: new Error("offline") });
			await flush();

			expect(interrupted()).toEqual([payload("a").url]);
			expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
			expect(mockFileSystem.deleteAsync).not.toHaveBeenCalled();
		});

		it("drops the partial file on an HTTP error", async () => {
			const { url } = payload("a");
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester, interrupted, ends } = setup("android", [url]);

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			succeed(mockChannels[0], 416);
			await flush();

			expect(interrupted()).toEqual([]);
			expect(mockFileSystem.deleteAsync).toHaveBeenCalledWith(
				"file:///docs/a.zip",
				{ idempotent: true },
			);
			expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
		});

		it("fails a paused download without a result", async () => {
			const { tester, ends } = setup("android");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			mockChannels[0].emit({ type: "result" });
			await flush();

			expect(ends()).toEqual([expect.objectContaining({ status: "error" })]);
		});
	});

	describe("ios", () => {
		it("never resumes: resumeData is an opaque blob there", async () => {
			const { url } = payload("a");
			mockFileSystem.getInfoAsync.mockResolvedValue({
				exists: true,
				size: 123,
			});
			const { tester, interrupted } = setup("ios", [url]);

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();

			expect(mockChannels[0].options.resumeData).toBeUndefined();

			mockChannels[0].emit({ type: "error", value: new Error("offline") });
			await flush();

			// the stale mark is kept as is, nothing new is added
			expect(interrupted()).toEqual([url]);
		});

		it("does not mark new downloads interrupted", async () => {
			const { tester, interrupted } = setup("ios");

			tester.dispatch(processAssetDownload(payload("a")));
			await flush();
			mockChannels[0].emit({ type: "error", value: new Error("offline") });
			await flush();

			expect(interrupted()).toEqual([]);
		});
	});
});
