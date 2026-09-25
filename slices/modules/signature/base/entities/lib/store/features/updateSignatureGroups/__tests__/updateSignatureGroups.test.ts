import { combineReducers } from "@reduxjs/toolkit";
import type {
	InvestigatorSignature,
	InvestigatorSignatureGroup,
	InvestigatorSkin,
} from "arkham-investigator-data";
import * as FileSystem from "expo-file-system";
import {
	createSagaTester,
	flush,
} from "../../../../../../../../../shared/lib/test/createSagaTester";
import downloadQueue, {
	addManyDownloadQueueItems,
	selectDownloadQueue,
} from "../../../../../../../../core/assets/download-queue/shared/lib/store/downloadQueue";
import { updateSignatureGroups } from "../updateSignatureGroups";
import { updateSignatureGroupsSaga } from "../updateSignatureGroupsSaga";

const BASE_URL = "https://example.com";

const mockState = {
	ready: true,
	groups: null as InvestigatorSignatureGroup[] | null,
	onDisk: new Set<string>(),
};

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@shared/config", () => ({ HAVE_AVIF_SUPPORT: true }));
jest.mock("expo-file-system", () => ({
	documentDirectory: "file:///docs/",
	getInfoAsync: jest.fn(async (uri: string) => ({
		exists: mockState.onDisk.has(uri.replace("file:///docs/", "")),
	})),
}));
jest.mock("@modules/core/theme/shared/lib", () => ({
	selectArtworkUrl: () => BASE_URL,
}));
jest.mock("@modules/core/assets/base/shared/lib", () => ({
	selectExternalImagesReady: () => mockState.ready,
}));
jest.mock("@modules/core/assets/download-queue/shared/lib", () =>
	jest.requireActual(
		"@modules/core/assets/download-queue/shared/lib/store/downloadQueue",
	),
);
jest.mock("@modules/signature/base/shared/lib", () => ({
	...jest.requireActual(
		"@modules/signature/base/shared/lib/common/getSignatureSkinId",
	),
	selectSignatureGroups: () => mockState.groups,
	setSignatureGroups: (payload: InvestigatorSignatureGroup[]) => {
		mockState.groups = payload;
		return { type: "signature/setSignatureGroups", payload };
	},
}));

type SignatureOptions = {
	code: string;
	version?: number;
	fullImage?: boolean;
};

const signature = ({ code, version, fullImage = true }: SignatureOptions) =>
	({
		code,
		has_full_image: fullImage,
		image: { id: code, ...(version && { version }) },
	}) as unknown as InvestigatorSignature;

const group = (
	id: string,
	signatures: InvestigatorSignature[],
	skins: InvestigatorSkin[] = [],
) => ({ id, signatures, skins }) as unknown as InvestigatorSignatureGroup;

const path = (type: string, code: string) => `images/avif/${type}/${code}.avif`;

const onDisk = (...codes: string[]) =>
	new Set(codes.flatMap((code) => [path("full", code), path("square", code)]));

const setup = () => {
	const tester = createSagaTester({
		reducer: combineReducers({ downloadQueue }),
	});
	tester.run(updateSignatureGroupsSaga);

	const queued = () =>
		selectDownloadQueue(tester.getState() as never)
			.map(({ diskPath }) => diskPath)
			.sort();

	return { tester, queued };
};

describe("updateSignatureGroups", () => {
	beforeEach(() => {
		mockState.ready = true;
		mockState.groups = null;
		mockState.onDisk = new Set();
		jest.mocked(FileSystem.getInfoAsync).mockClear();
	});

	it("queues an image missing on disk even when the data did not change its version", async () => {
		// 12007 got its image on the server, the data kept the same version
		const groups = [group("07003", [signature({ code: "12007" })])];
		mockState.groups = groups;
		mockState.onDisk = onDisk("07003");

		const { tester, queued } = setup();
		tester.dispatch(updateSignatureGroups(groups));
		await flush(50);

		expect(queued()).toEqual([path("full", "12007"), path("square", "12007")]);
	});

	it("downloads a changed version again although the old file is on disk", async () => {
		mockState.groups = [group("01001", [signature({ code: "01001" })])];
		mockState.onDisk = onDisk("01001");

		const { tester, queued } = setup();
		tester.dispatch(
			updateSignatureGroups([
				group("01001", [signature({ code: "01001", version: 2 })]),
			]),
		);
		await flush(50);

		expect(queued()).toEqual([path("full", "01001"), path("square", "01001")]);
	});

	it("does not queue a full image of a signature that has none", async () => {
		const groups = [
			group("custom", [signature({ code: "custom", fullImage: false })]),
		];
		mockState.groups = groups;

		const { tester, queued } = setup();
		tester.dispatch(updateSignatureGroups(groups));
		await flush(50);

		expect(queued()).toEqual([path("square", "custom")]);
	});

	it("queues missing skin images", async () => {
		const skin = { id: "01001_revised", image: {} } as InvestigatorSkin;
		const groups = [group("01001", [signature({ code: "01001" })], [skin])];
		mockState.groups = groups;
		mockState.onDisk = onDisk("01001");

		const { tester, queued } = setup();
		tester.dispatch(updateSignatureGroups(groups));
		await flush(50);

		expect(queued()).toEqual([
			path("full", "01001_revised"),
			path("square", "01001_revised"),
		]);
	});

	it("does not queue an image twice", async () => {
		const groups = [group("07003", [signature({ code: "12007" })])];
		mockState.groups = groups;

		const { tester, queued } = setup();
		tester.dispatch(updateSignatureGroups(groups));
		await flush(50);
		tester.dispatch(updateSignatureGroups(groups));
		await flush(50);

		expect(queued()).toHaveLength(2);
		expect(tester.ofType(addManyDownloadQueueItems.type)).toHaveLength(1);
	});

	it("waits for the archive: nothing is queued before it is unpacked", async () => {
		mockState.ready = false;
		const groups = [group("07003", [signature({ code: "12007" })])];

		const { tester, queued } = setup();
		tester.dispatch(updateSignatureGroups(groups));
		await flush(50);

		expect(queued()).toEqual([]);
		expect(FileSystem.getInfoAsync).not.toHaveBeenCalled();
	});
});
