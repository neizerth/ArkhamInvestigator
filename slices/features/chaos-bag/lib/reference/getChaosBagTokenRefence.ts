import { isNotNil } from "ramda";
import { arkhamDBTokens } from "../../config";
import { allChaosTokenTypes } from "../../config/token/types";
import type { ChaosTokenType } from "../../model";

type Options = {
	signatureText: string;
	referenceText: string;
};

export const getChaosBagTokenRefence = (sources: string[]) => {
	const parts = sources.flatMap(parseText);

	const tokens: ReferencePart = Object.assign({}, ...parts);

	return tokens;
};

const parseText = (text: string) =>
	text.split("\n").map(parseLine).filter(isNotNil);

type ReferencePart = Partial<Record<ChaosTokenType, string>>;

const parseLine = (line: string): ReferencePart | null => {
	const tokenPattern = /^\[([^\]]+)\](.*)$/;

	const matches = line.match(tokenPattern);

	if (!matches) {
		return null;
	}
	const id = matches[1];
	const effect = matches[2]?.trim().replace(/^(: )|(：)/, "");

	if (!effect || !id) {
		return null;
	}
	const token = arkhamDBTokens[id] || id;

	if (!allChaosTokenTypes.includes(token)) {
		return null;
	}

	return {
		[token]: effect,
	};
};
