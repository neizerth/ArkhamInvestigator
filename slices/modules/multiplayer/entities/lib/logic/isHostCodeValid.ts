import { getHostIPFromInviteCode } from "./getHostIPFromInviteCode";

export const isHostCodeValid = (code: string) => {
	return code.length === 8 && Boolean(getHostIPFromInviteCode(code));
};
