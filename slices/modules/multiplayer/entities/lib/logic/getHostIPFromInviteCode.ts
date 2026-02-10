export const getHostIPFromInviteCode = (inviteCode: string) => {
	return inviteCode
		.match(/.{1,2}/g)
		?.map((x) => Number.parseInt(x.replace(/\X/g, "0"), 16).toString())
		.join(".");
};
