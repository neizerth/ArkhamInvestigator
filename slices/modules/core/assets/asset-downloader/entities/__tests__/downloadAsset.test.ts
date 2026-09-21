import { notEnoughSpace } from "@modules/core/disk/entities/notEnoughSpace";
import {
	createSagaTester,
	flush,
} from "../../../../../../shared/lib/test/createSagaTester";
import { downloadAsset } from "../downloadAsset/downloadAsset";
import { downloadAssetSaga } from "../downloadAsset/downloadAssetSaga";
import {
	assetDownloadEnd,
	processAssetDownload,
} from "../processAssetDownload/processAssetDownload";

const mockGetFreeDiskStorageAsync = jest.fn();

jest.mock("expo-file-system", () => ({
	getFreeDiskStorageAsync: () => mockGetFreeDiskStorageAsync(),
}));

const payload = {
	url: "https://example.com/a.zip",
	diskPath: "a.zip",
	size: 100,
};

beforeEach(() => {
	jest.clearAllMocks();
});

describe("downloadAsset", () => {
	it("aborts with an error when there is not enough space", async () => {
		mockGetFreeDiskStorageAsync.mockResolvedValue(100);
		const tester = createSagaTester();
		tester.run(downloadAssetSaga);

		tester.dispatch(downloadAsset({ ...payload, requiredSize: 250 }));
		await flush();

		expect(tester.ofType(notEnoughSpace.type)).toEqual([
			notEnoughSpace({ required: 250, freeSpace: 100 }),
		]);
		expect(tester.ofType(assetDownloadEnd.type)).toEqual([
			{
				type: assetDownloadEnd.type,
				payload: expect.objectContaining({
					url: payload.url,
					status: "error",
					error: expect.any(Error),
				}),
			},
		]);
		expect(tester.ofType(processAssetDownload.type)).toEqual([]);
	});

	it("starts the download when there is enough space", async () => {
		mockGetFreeDiskStorageAsync.mockResolvedValue(1000);
		const tester = createSagaTester();
		tester.run(downloadAssetSaga);

		tester.dispatch(downloadAsset({ ...payload, requiredSize: 250 }));
		await flush();

		expect(tester.ofType(notEnoughSpace.type)).toEqual([]);
		expect(tester.ofType(processAssetDownload.type)).toHaveLength(1);
	});

	it("skips the space check without a required size", async () => {
		const tester = createSagaTester();
		tester.run(downloadAssetSaga);

		tester.dispatch(downloadAsset(payload));
		await flush();

		expect(mockGetFreeDiskStorageAsync).not.toHaveBeenCalled();
		expect(tester.ofType(processAssetDownload.type)).toHaveLength(1);
	});
});
