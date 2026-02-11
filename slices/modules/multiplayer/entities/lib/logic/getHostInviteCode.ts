import { codeAlphabet } from "../../config";

export const getHostInviteCode = (ip: string): string => {
	return ip
		.split(".")
		.map((octet) => {
			const num = Number(octet);
			const first = Math.floor(num / 16);
			const second = num % 16;

			return codeAlphabet[first] + codeAlphabet[second];
		})
		.join("");
};
