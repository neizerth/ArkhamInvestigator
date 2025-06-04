import { isNotNil, last, prop } from "ramda";
import { arkhamDBTokens } from "../../config";
import { allChaosTokenTypes } from "../../config/token/types";
import type { ChaosTokenType } from "../../model";

export const getChaosBagTokenReference = (sources: string[]) => {
	return sources.flatMap(parseText);
};

const tokenLinePattern = /\n(?=\[)/;

const parseText = (text: string) =>
	text.split(tokenLinePattern).map(parseLine).filter(isNotNil);

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

	const iconMatches = iconString.match(/(^|\n)\s*\[([^\]]+)\]/g);

	if (!iconMatches) {
		return null;
	}

	const icons = iconMatches.map((icon) => icon.replace(/[\[\]]/g, ""));

	const items = icons
		.map((icon) => ({
			icon,
			token: arkhamDBTokens[icon] || icon,
		}))
		.filter((item) => {
			return allChaosTokenTypes.includes(item.token);
		});

	const lastItem = last(items);

	if (!lastItem) {
		return null;
	}

	const lasstIcon = `[${lastItem.icon}]`;
	const index = line.indexOf(lasstIcon);

	const effectIndex = index + lasstIcon.length;
	const nonTokenText = line.slice(effectIndex);

	const effect = nonTokenText.trim().replace(/^(: )|(：)/, "");

	const tokens = items.map(prop("token"));

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
