import { codeAlphabet } from "../../config";

export const getHostIPFromInviteCode = (
	inviteCode: string,
): string | undefined => {
	const cleanCode = inviteCode.toUpperCase();

	const charToIndex: Record<string, number> = {};
	for (let i = 0; i < codeAlphabet.length; i++) {
		const char = codeAlphabet[i];
		if (!(char in charToIndex)) charToIndex[char] = i;
	}

	const chunks = cleanCode.match(/.{1,2}/g);
	if (!chunks || chunks.length !== 4) return undefined;

	const octets: string[] = [];

	for (const pair of chunks) {
		const first = charToIndex[pair[0]];
		const second = charToIndex[pair[1]];

		if (first === undefined || second === undefined) return undefined;

		octets.push((first * 16 + second).toString());
	}

	return octets.join(".");
};
