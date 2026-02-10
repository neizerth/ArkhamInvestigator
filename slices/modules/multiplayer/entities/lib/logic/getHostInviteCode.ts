export const getHostInviteCode = (ip: string) => {
	return ip
		.split(".")
		.map((x) => {
			return Number(x).toString(16).padStart(2, "X").replace(/0/g, "X");
		})
		.join("")
		.toUpperCase();
};
