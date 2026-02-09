export const getHostIPFromInviteCode = (inviteCode: string) => {
	return inviteCode
		.match(/.{1,2}/g)
		?.map((x) => Number.parseInt(x, 16).toString())
		.join(".");
};
