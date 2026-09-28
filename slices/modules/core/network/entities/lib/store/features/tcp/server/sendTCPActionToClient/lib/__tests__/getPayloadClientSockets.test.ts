const mockSocketMap = new Map<string, { destroyed: boolean }>();

jest.mock("@modules/core/network/shared/lib", () => ({
	getTCPClientSockets: () => Array.from(mockSocketMap.values()),
	getTCPClientSocket: (id: string) => mockSocketMap.get(id),
}));

import { getPayloadClientSockets } from "../getPayloadClientSockets";

const client1 = { destroyed: false, id: "client-1" };
const client2 = { destroyed: false, id: "client-2" };
const destroyedClient = { destroyed: true, id: "client-3" };

beforeEach(() => {
	mockSocketMap.clear();
	mockSocketMap.set("client-1", client1);
	mockSocketMap.set("client-2", client2);
	mockSocketMap.set("client-3", destroyedClient);
});

describe("getPayloadClientSockets", () => {
	it("returns only the targeted socket for type 'single'", () => {
		const sockets = getPayloadClientSockets({
			type: "single",
			networkId: "client-2",
			action: {
				type: "test",
				payload: undefined,
				meta: { notify: "all", remote: true },
			},
		});
		expect(sockets).toEqual([client2]);
	});

	it("returns an empty array for 'single' when the socket is missing", () => {
		const sockets = getPayloadClientSockets({
			type: "single",
			networkId: "unknown",
			action: {
				type: "test",
				payload: undefined,
				meta: { notify: "all", remote: true },
			},
		});
		expect(sockets).toEqual([]);
	});

	it("broadcasts to every non-destroyed socket when type is 'all'/default, excluding destroyed ones", () => {
		const sockets = getPayloadClientSockets({
			type: "all",
			action: {
				type: "test",
				payload: undefined,
				meta: { notify: "all", remote: true },
			},
		});
		expect(sockets).toEqual([client1, client2]);
	});

	it("excludes networkIds listed in 'except' for broadcast mode", () => {
		const sockets = getPayloadClientSockets({
			type: "all",
			except: ["client-1"],
			action: {
				type: "test",
				payload: undefined,
				meta: { notify: "all", remote: true },
			},
		});
		expect(sockets).toEqual([client2]);
	});

	it("filters out destroyed sockets even when explicitly targeted as 'single'", () => {
		const sockets = getPayloadClientSockets({
			type: "single",
			networkId: "client-3",
			action: {
				type: "test",
				payload: undefined,
				meta: { notify: "all", remote: true },
			},
		});
		expect(sockets).toEqual([]);
	});
});
