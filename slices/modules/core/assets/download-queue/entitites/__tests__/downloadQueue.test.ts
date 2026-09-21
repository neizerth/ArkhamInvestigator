import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import { assetDownloadEnd } from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import { combineReducers } from "@reduxjs/toolkit";
import {
	createSagaTester,
	flush,
} from "../../../../../../shared/lib/test/createSagaTester";
import downloadQueue, {
	addManyDownloadQueueItems,
	selectDownloadQueue,
} from "../../shared/lib/store/downloadQueue";
import type { DownloadQueueItem } from "../../shared/model";
import { checkDownloadQueue } from "../checkDownloadQueue/checkDownloadQueue";
import { checkDownloadQueueSaga } from "../checkDownloadQueue/checkDownloadQueueSaga";
import {
	downloadQueueItemFailed,
	downloadQueueItemSuccess,
} from "../processDownloadQueueItem/processDownloadQueueItem";
import { processDownloadQueueItemSaga } from "../processDownloadQueueItem/processDownloadQueueItemSaga";

const reducer = combineReducers({ downloadQueue });

const item = (id: string): DownloadQueueItem => ({
	id,
	url: `https://example.com/${id}.png`,
	diskPath: `${id}.png`,
});

type Result = "success" | "error" | "pending";

const setup = (results: Record<string, Result>) => {
	const tester = createSagaTester({ reducer });
	const pending: DownloadQueueItem[] = [];

	// emulates asset-downloader: answers `downloadAsset` with `assetDownloadEnd`
	tester.respond((action) => {
		if (!downloadAsset.match(action)) {
			return;
		}
		const { payload } = action;
		const result = results[payload.url];

		if (result === "pending") {
			pending.push(payload as DownloadQueueItem);
			return;
		}

		return result === "success"
			? assetDownloadEnd({ ...payload, status: "success", uri: payload.url })
			: assetDownloadEnd({ ...payload, status: "error", error: "failed" });
	});

	tester.run(checkDownloadQueueSaga);
	tester.run(processDownloadQueueItemSaga);

	const queueIds = () =>
		selectDownloadQueue(tester.getState() as never).map(({ id }) => id);

	const downloadedUrls = () =>
		tester
			.ofType(downloadAsset.type)
			.map(
				(action) => (action as ReturnType<typeof downloadAsset>).payload.url,
			);

	return { tester, pending, queueIds, downloadedUrls };
};

describe("download queue", () => {
	it("downloads items one by one and removes them only after success", async () => {
		const a = item("a");
		const b = item("b");
		const { tester, queueIds, downloadedUrls } = setup({
			[a.url]: "success",
			[b.url]: "success",
		});

		tester.dispatch(addManyDownloadQueueItems([a, b]));
		tester.dispatch(checkDownloadQueue());
		await flush(50);

		expect(downloadedUrls()).toEqual([a.url, b.url]);
		expect(tester.ofType(downloadQueueItemSuccess.type)).toHaveLength(2);
		expect(queueIds()).toEqual([]);
	});

	it("keeps a failed item in the queue and skips it until the next check", async () => {
		const a = item("a");
		const b = item("b");
		const { tester, queueIds, downloadedUrls } = setup({
			[a.url]: "error",
			[b.url]: "success",
		});

		tester.dispatch(addManyDownloadQueueItems([a, b]));
		tester.dispatch(checkDownloadQueue());
		await flush(50);

		expect(downloadedUrls()).toEqual([a.url, b.url]);
		expect(tester.ofType(downloadQueueItemFailed.type)).toHaveLength(1);
		expect(queueIds()).toEqual(["a"]);

		// the next check retries it
		tester.dispatch(checkDownloadQueue());
		await flush(50);

		expect(downloadedUrls()).toEqual([a.url, b.url, a.url]);
	});

	it("merges checks that come during a check into one more pass", async () => {
		const a = item("a");
		const b = item("b");
		const results: Record<string, Result> = { [a.url]: "pending" };
		const { tester, pending, downloadedUrls, queueIds } = setup(results);

		tester.dispatch(addManyDownloadQueueItems([a]));
		tester.dispatch(checkDownloadQueue());
		await flush();

		// triggers while `a` is downloading: no parallel pass, no second download of `a`
		tester.dispatch(addManyDownloadQueueItems([b]));
		tester.dispatch(checkDownloadQueue());
		tester.dispatch(checkDownloadQueue());
		await flush();

		expect(downloadedUrls()).toEqual([a.url]);

		results[b.url] = "success";
		const [download] = pending;
		tester.dispatch(
			assetDownloadEnd({ ...download, status: "success", uri: download.url }),
		);
		await flush(50);

		expect(downloadedUrls()).toEqual([a.url, b.url]);
		expect(queueIds()).toEqual([]);
	});
});
