import type { NetworkRole, NetworkType } from "../model";

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

export const networkRoles: NetworkRole[] = ["client", "host"];

export const TCP_PORT = 42424;
export const TCP_HOST = "0.0.0.0";
export const TCP_SERVICE_NAME = "arkham-investigator";
export const TCP_SERVER_NAME = "ArkhamHost";
