import { deeplinkRoutes } from "@modules/core/link/shared/config";
import { createDeeplink } from "@modules/core/link/shared/lib/createDeeplink";
import { getHostInviteCode } from "./getHostInviteCode";

export const getHostDeeplink = (ip: string) => {
	const invite = getHostInviteCode(ip);

	return createDeeplink(deeplinkRoutes.joinLocalMultiplayer, {
		invite,
	});
};
