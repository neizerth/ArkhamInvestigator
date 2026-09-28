import { consumeTcpJsonBuffer } from "../consumeTcpJsonBuffer";

const PING = "__ping__";

describe("consumeTcpJsonBuffer", () => {
	it("returns nothing for an empty buffer", () => {
		expect(consumeTcpJsonBuffer("", PING)).toEqual({
			messages: [],
			remainder: "",
		});
	});

	it("extracts a single complete object", () => {
		const result = consumeTcpJsonBuffer('{"a":1}', PING);
		expect(result.messages).toEqual(['{"a":1}']);
		expect(result.remainder).toBe("");
	});

	it("extracts multiple concatenated objects in one pass", () => {
		const result = consumeTcpJsonBuffer('{"a":1}{"b":2}', PING);
		expect(result.messages).toEqual(['{"a":1}', '{"b":2}']);
		expect(result.remainder).toBe("");
	});

	it("extracts newline-delimited objects", () => {
		const result = consumeTcpJsonBuffer('{"a":1}\n{"b":2}\n', PING);
		expect(result.messages).toEqual(['{"a":1}', '{"b":2}']);
		expect(result.remainder).toBe("");
	});

	it("keeps an incomplete trailing object as remainder", () => {
		const result = consumeTcpJsonBuffer('{"a":1}{"b":2', PING);
		expect(result.messages).toEqual(['{"a":1}']);
		expect(result.remainder).toBe('{"b":2');
	});

	it("does not miscount braces inside string values", () => {
		const result = consumeTcpJsonBuffer('{"a":"}{"}{"b":2}', PING);
		expect(result.messages).toEqual(['{"a":"}{"}', '{"b":2}']);
		expect(result.remainder).toBe("");
	});

	it("does not miscount escaped quotes inside strings", () => {
		const payload = String.raw`{"a":"\"}"}`;
		const result = consumeTcpJsonBuffer(payload, PING);
		expect(result.messages).toEqual([payload]);
		expect(result.remainder).toBe("");
	});

	it("skips a watchdog ping line", () => {
		const result = consumeTcpJsonBuffer(`${PING}\n{"a":1}`, PING);
		expect(result.messages).toEqual(['{"a":1}']);
		expect(result.remainder).toBe("");
	});

	it("holds an unterminated ping line as remainder instead of dropping it", () => {
		const result = consumeTcpJsonBuffer(PING, PING);
		expect(result.messages).toEqual([]);
		expect(result.remainder).toBe(PING);
	});

	it("drops non-JSON noise before the next object", () => {
		const result = consumeTcpJsonBuffer('garbage{"a":1}', PING);
		expect(result.messages).toEqual(['{"a":1}']);
		expect(result.remainder).toBe("");
	});

	it("drops trailing noise with no object start as remainder", () => {
		const result = consumeTcpJsonBuffer("just noise, no braces", PING);
		expect(result.messages).toEqual([]);
		expect(result.remainder).toBe("just noise, no braces");
	});

	it("resumes correctly once the remainder is completed by a later chunk", () => {
		const first = consumeTcpJsonBuffer('{"a":1}{"b":2', PING);
		const second = consumeTcpJsonBuffer(`${first.remainder}}`, PING);
		expect(second.messages).toEqual(['{"b":2}']);
		expect(second.remainder).toBe("");
	});
});
