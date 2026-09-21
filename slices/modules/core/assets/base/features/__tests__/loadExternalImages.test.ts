import {
	appUpdatesCheckFailed,
	appUpdatesChecked,
	checkAppUpdates,
} from "@modules/core/app/entities/checkAppUpdates/checkAppUpdates";
import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import { assetDownloadEnd } from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import {
	unzip,
	unzipComplete,
	unzipError,
} from "@modules/core/disk/entities/unzip/unzip";
import { combineReducers } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";
import { createSagaTester } from "../../../../../../shared/lib/test/createSagaTester";
import { retryExternalImagesDownload } from "../../shared/lib/store/actions";
import assets, { setExternalImagesLoaded } from "../../shared/lib/store/assets";
import { loadExternalImages } from "../download-external-images/loadExternalImages";

const DEFAULT_URL = "https://default.example.com";
const mockArchiveUrl = { value: `${DEFAULT_URL}/images/avif.color.zip` };

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("../../shared/config", () => ({
	externalImagesArchiveDiskPath: "images.zip",
	externalImagesDiskPath: "images",
	externalImagesFilename: "avif.color.zip",
}));
jest.mock("@modules/core/theme/shared/lib", () => ({
	selectArtworkArchiveUrl: () => mockArchiveUrl.value,
}));
jest.mock("@modules/core/network/shared/lib", () =>
	jest.requireActual(
		"@modules/core/network/shared/lib/store/util/filterInternetIsReachable",
	),
);

const { internetReachabilityChanged } = jest.requireActual(
	"@modules/core/network/shared/lib/store/actions/common",
);

const reducer = combineReducers({ assets });

const buildInfo = {
	assets: [{ filename: "avif.color.zip", size: 100 }],
} as unknown as BuildInfo;

type Setup = {
	unzipResults?: ("ok" | "error")[];
};

const setup = ({ unzipResults = ["ok"] }: Setup = {}) => {
	const tester = createSagaTester({ reducer });

	// emulates asset-downloader and disk: success unless told otherwise
	tester.respond((action) => {
		if (downloadAsset.match(action)) {
			return assetDownloadEnd({
				...action.payload,
				status: "success",
				uri: action.payload.url,
			});
		}
		if (unzip.match(action)) {
			const result = unzipResults.shift() ?? "ok";
			return result === "ok"
				? unzipComplete({ ...action.payload, path: action.payload.dest })
				: unzipError({ ...action.payload, error: "broken archive" });
		}
	});

	let done = false;
	tester
		.run(loadExternalImages)
		.toPromise()
		.then(() => {
			done = true;
		});

	const flags = () => {
		const { externalImagesLoaded, externalImagesReady, externalImagesError } =
			tester.getState().assets;
		return { externalImagesLoaded, externalImagesReady, externalImagesError };
	};
	const downloads = () =>
		tester
			.ofType(downloadAsset.type)
			.map(
				(action) => (action as ReturnType<typeof downloadAsset>).payload.url,
			);

	return { tester, flags, downloads, isDone: () => done };
};

beforeEach(() => {
	jest.useFakeTimers();
	mockArchiveUrl.value = `${DEFAULT_URL}/images/avif.color.zip`;
});

afterEach(() => {
	jest.useRealTimers();
});

describe("loadExternalImages", () => {
	it("downloads and unpacks the archive after the update check", async () => {
		const { tester, flags, downloads, isDone } = setup();

		tester.dispatch(appUpdatesChecked(buildInfo));
		await jest.advanceTimersByTimeAsync(0);

		expect(downloads()).toEqual([mockArchiveUrl.value]);
		expect(flags()).toEqual({
			externalImagesLoaded: true,
			externalImagesReady: true,
			externalImagesError: false,
		});
		expect(isDone()).toBe(true);
	});

	it("matches the download result by the actual archive url", async () => {
		mockArchiveUrl.value = "https://custom.example.com/images/avif.color.zip";
		const { tester, isDone } = setup();

		tester.dispatch(appUpdatesChecked(buildInfo));
		await jest.advanceTimersByTimeAsync(0);

		expect(isDone()).toBe(true);
	});

	it("goes straight to unzip when the archive is already downloaded", async () => {
		const { tester, downloads, isDone } = setup();
		tester.dispatch(setExternalImagesLoaded(true));

		tester.dispatch(appUpdatesChecked(buildInfo));
		await jest.advanceTimersByTimeAsync(0);

		expect(downloads()).toEqual([]);
		expect(tester.ofType(unzip.type)).toHaveLength(1);
		expect(isDone()).toBe(true);
	});

	it("downloads the archive again after a broken unzip", async () => {
		const { tester, flags, downloads, isDone } = setup({
			unzipResults: ["error", "ok"],
		});

		tester.dispatch(appUpdatesChecked(buildInfo));
		await jest.advanceTimersByTimeAsync(0);

		expect(flags()).toEqual({
			externalImagesLoaded: false,
			externalImagesReady: false,
			externalImagesError: true,
		});

		// the retry button: a new update check is requested
		tester.dispatch(retryExternalImagesDownload());
		await jest.advanceTimersByTimeAsync(0);

		expect(flags().externalImagesError).toBe(false);
		expect(tester.ofType(checkAppUpdates.type)).toHaveLength(1);

		tester.dispatch(appUpdatesChecked(buildInfo));
		await jest.advanceTimersByTimeAsync(0);

		expect(downloads()).toHaveLength(2);
		expect(isDone()).toBe(true);
	});

	it("retries a failed update check on a timer", async () => {
		const { tester, flags } = setup();

		tester.dispatch(appUpdatesCheckFailed(new Error("offline")));
		await jest.advanceTimersByTimeAsync(0);
		expect(flags().externalImagesError).toBe(true);

		await jest.advanceTimersByTimeAsync(4_999);
		expect(tester.ofType(checkAppUpdates.type)).toHaveLength(0);

		await jest.advanceTimersByTimeAsync(1);
		expect(tester.ofType(checkAppUpdates.type)).toHaveLength(1);
	});

	it("retries at once when the internet comes back, without its own check", async () => {
		const { tester, flags, isDone } = setup();

		tester.dispatch(appUpdatesCheckFailed(new Error("offline")));
		await jest.advanceTimersByTimeAsync(0);

		tester.dispatch(internetReachabilityChanged(true));
		await jest.advanceTimersByTimeAsync(0);

		// checkInitialAppUpdatesSaga requests the check on this event
		expect(tester.ofType(checkAppUpdates.type)).toHaveLength(0);
		expect(flags().externalImagesError).toBe(false);

		tester.dispatch(appUpdatesChecked(buildInfo));
		await jest.advanceTimersByTimeAsync(0);

		expect(isDone()).toBe(true);
	});

	it("does nothing when artworks are disabled", async () => {
		mockArchiveUrl.value = undefined as unknown as string;
		const { tester, isDone } = setup();
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.actions).toEqual([]);
		expect(isDone()).toBe(true);
	});
});
