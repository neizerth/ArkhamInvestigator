import { isNotNil, last } from "ramda";
import { arkhamDBTokens } from "../../config";
import { allChaosTokenTypes } from "../../config/token/types";
import type { ChaosTokenType } from "../../model";

type Options = {
	signatureText: string;
	referenceText: string;
};

export const getChaosBagTokenRefence = (sources: string[]) => {
	return sources.flatMap(parseText);
};

const parseText = (text: string) =>
	text.split("\n").map(parseLine).filter(isNotNil);

type ReferencePart = { id: string } & (
	| {
			type: "single";
			token: ChaosTokenType;
			effect: string;
	  }
	| {
			type: "group";
			tokens: ChaosTokenType[];
			effect: string;
	  }
);

const parseLine = (line: string): ReferencePart | null => {
	const [iconString] = line.split(/[:：]/);

	if (!iconString) {
		return null;
	}

	const iconMatches = iconString.match(/\[([^\]]+)\]/g);

	if (!iconMatches) {
		return null;
	}

	const icons = iconMatches.map((icon) => icon.replace(/[\[\]]/g, ""));
	const tokens = icons
		.map((icon) => arkhamDBTokens[icon] || icon)
		.filter((token) => {
			return allChaosTokenTypes.includes(token);
		});

	if (tokens.length === 0) {
		return null;
	}

	const lasstIcon = `[${last(icons)}]`;
	const index = line.indexOf(lasstIcon);
	const effectIndex = index + lasstIcon.length;
	const effect = line
		.slice(effectIndex)
		.trim()
		.replace(/^(: )|(：)/, "");

	if (tokens.length > 1) {
		return {
			id: tokens[0],
			type: "group",
			tokens,
			effect,
		};
	}

	return {
		id: tokens.join("-"),
		type: "single",
		token: tokens[0],
		effect,
	};
};
