jest.mock("@shared/config", () => {
	const actual = jest.requireActual("@shared/config");
	return {
		...actual,
		SITE_URL: "https://neizerth.github.io/ArkhamInvestigator/",
	};
});

import { getHostDeeplink } from "../getHostDeeplink";
import { getHostInviteCode } from "../getHostInviteCode";
import { getHostShareLink } from "../getHostShareLink";

describe("getHostDeeplink", () => {
	it("embeds the correct invite code for the given IP in the deeplink's query string", () => {
		const ip = "192.168.1.1";
		const link = getHostDeeplink(ip);
		const url = new URL(link);

		expect(url.pathname + url.host).toContain("join/local");
		expect(url.searchParams.get("invite")).toBe(getHostInviteCode(ip));
	});
});

describe("getHostShareLink", () => {
	it("embeds the correct invite code as the join query param on the https bridge URL", () => {
		const ip = "10.0.2.2";
		const link = getHostShareLink(ip);
		const url = new URL(link);

		expect(url.protocol).toBe("https:");
		expect(url.searchParams.get("join")).toBe(getHostInviteCode(ip));
	});

	it("produces a different link for a different IP", () => {
		expect(getHostShareLink("10.0.2.2")).not.toBe(getHostShareLink("10.0.2.3"));
	});
});
