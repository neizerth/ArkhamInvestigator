import { seconds } from "@shared/lib";
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

export const TCP_CONFIRMATION_TIMEOUT = seconds(5);
export const TCP_RETRY_DELAY = seconds(5);
/** Max retries per socket before giving up (stops infinite retry cycle). */
export const TCP_CONFIRMATION_MAX_RETRIES = 5;

export const TCP_SERVER_CONFIRMATION_ENABLED = true;
export const TCP_CLIENT_CONFIRMATION_ENABLED = true;
