import { createMessageIdCache } from "../createMessageIdCache";

describe("createMessageIdCache", () => {
	it("reports a fresh id as new and registers it", () => {
		const cache = createMessageIdCache();
		expect(cache.check("a")).toBe(false);
	});

	it("reports a repeated id as already seen (dedup for lost-ACK retries)", () => {
		const cache = createMessageIdCache();
		cache.check("a");
		expect(cache.check("a")).toBe(true);
	});

	it("treats an empty message id as never seen", () => {
		const cache = createMessageIdCache();
		expect(cache.check("")).toBe(false);
		expect(cache.check("")).toBe(false);
	});

	it("evicts the oldest id once the limit is exceeded", () => {
		const cache = createMessageIdCache(2);
		cache.check("a");
		cache.check("b");
		cache.check("c"); // evicts "a"
		expect(cache.check("b")).toBe(true); // "b" still tracked
		expect(cache.check("a")).toBe(false); // "a" was evicted, so it looks new again
	});

	it("clear() forgets every previously seen id", () => {
		const cache = createMessageIdCache();
		cache.check("a");
		cache.clear();
		expect(cache.check("a")).toBe(false);
	});
});
