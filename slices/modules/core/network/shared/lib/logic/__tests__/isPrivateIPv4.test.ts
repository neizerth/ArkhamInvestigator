import { isPrivateIPv4 } from "../isPrivateIPv4";

describe("isPrivateIPv4", () => {
	it.each([
		"10.0.0.1",
		"172.16.0.1",
		"172.31.255.255",
		"192.168.1.1",
		"127.0.0.1",
	])("accepts private/loopback address %s", (ip) => {
		expect(isPrivateIPv4(ip)).toBe(true);
	});

	it.each(["203.0.113.66", "8.8.8.8", "172.15.0.1", "172.32.0.1", "1.1.1.1"])(
		"rejects public address %s",
		(ip) => {
			expect(isPrivateIPv4(ip)).toBe(false);
		},
	);

	it.each(["NaN.NaN.NaN.NaN", "not-an-ip", "192.168.1", "192.168.1.1.1", ""])(
		"rejects malformed input %s",
		(ip) => {
			expect(isPrivateIPv4(ip)).toBe(false);
		},
	);

	it("rejects an out-of-range octet", () => {
		expect(isPrivateIPv4("192.168.1.999")).toBe(false);
	});
});
