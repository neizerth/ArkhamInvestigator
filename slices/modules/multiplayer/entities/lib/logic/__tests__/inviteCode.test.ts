import { codeAlphabet } from "@modules/multiplayer/entities/config";
import { getHostIPFromInviteCode } from "../getHostIPFromInviteCode";
import { getHostInviteCode } from "../getHostInviteCode";
import { isHostCodeValid } from "../isHostCodeValid";

describe("invite code alphabet", () => {
	it("has exactly 16 distinct characters (one nibble each)", () => {
		expect(codeAlphabet.length).toBe(16);
		expect(new Set(codeAlphabet.split("")).size).toBe(16);
	});
});

describe("getHostInviteCode / getHostIPFromInviteCode round-trip", () => {
	it.each(["192.168.1.1", "10.0.2.15", "0.0.0.0", "255.255.255.255"])(
		"round-trips %s through encode/decode",
		(ip) => {
			const code = getHostInviteCode(ip);
			expect(code).toHaveLength(8);
			expect(getHostIPFromInviteCode(code)).toBe(ip);
		},
	);

	it("decoding is case-insensitive", () => {
		const code = getHostInviteCode("192.168.1.1");
		expect(getHostIPFromInviteCode(code.toLowerCase())).toBe("192.168.1.1");
	});
});

describe("getHostIPFromInviteCode", () => {
	it("rejects a code with the wrong number of characters", () => {
		expect(getHostIPFromInviteCode("DFG")).toBeUndefined();
	});

	it("rejects a code containing a character outside the alphabet", () => {
		// "9" was a stray 17th alphabet character before the fix (L2); must decode to undefined, not NaN.
		expect(getHostIPFromInviteCode("99999999")).toBeUndefined();
	});

	it("never produces a NaN octet for out-of-alphabet input", () => {
		const result = getHostIPFromInviteCode("!!!!!!!!");
		expect(result).toBeUndefined();
	});
});

describe("isHostCodeValid", () => {
	it("accepts a real invite code", () => {
		expect(isHostCodeValid(getHostInviteCode("192.168.1.1"))).toBe(true);
	});

	it("rejects a code of the right length but invalid alphabet (length-only check regression, L2/S2)", () => {
		expect(isHostCodeValid("99999999")).toBe(false);
	});

	it("rejects a code of the wrong length", () => {
		expect(isHostCodeValid("DFG")).toBe(false);
	});
});
