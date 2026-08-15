import { SITE_URL } from "@shared/config";
import { JOIN_LINK_PARAM } from "../../config";
import { getHostInviteCode } from "./getHostInviteCode";

/**
 * Why not share the `inv://` deeplink directly: custom schemes are not opened by the system
 * camera QR scanner on iOS and are not turned into tappable links by messengers. We share an
 * https link to the GitHub Pages bridge instead (`www/index.html`), which redirects to the
 * deeplink — see `getHostDeeplink` for the target format.
 */
export const getHostShareLink = (ip: string) => {
	const invite = getHostInviteCode(ip);

	const url = new URL(SITE_URL);
	url.searchParams.set(JOIN_LINK_PARAM, invite);

	return url.toString();
};
