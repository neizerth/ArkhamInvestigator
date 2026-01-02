import type { NetworkType } from "../model";

export const networkTypeIconMapping: Record<NetworkType, string> = {
	wifi: "connection",
	cellular: "mobile2",
	ethernet: "tree",
	bluetooth: "link",
	none: "blocked",
	unknown: "sphere",
	other: "sphere",
	wimax: "podcast",
	vpn: "lock",
};
