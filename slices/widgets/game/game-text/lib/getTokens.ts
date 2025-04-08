import { identity } from "ramda";
import { haveChineseGlyphs } from "./glyphs";

type Options = {
	text: string;
	breakSentence?: boolean;
};

const breakId = "__BREAK__";

export const getTokens = (options: Options) => {
	return (
		tokenize(options)
			// remove empty tokens
			.filter(identity)
	);
};

const tokenize = ({ text, breakSentence = true }: Options) => {
	// console.log(text);
	if (haveChineseGlyphs(text)) {
		// keep last 2 symbols on line
		return getChineseTokens(text);
	}

	if (!breakSentence) {
		return [text];
	}

	return (
		text
			// break by space
			.replace(/([ ])/g, ` ${breakId}`)
			.split(breakId)
	);
};

export const getChineseTokens = (text: string) => {
	const tokens = text
		.slice(0, -2)
		// keep punctuation
		.replace(/(?![?.,;!¡¿。、·])(.)/g, `$1${breakId}`)
		.split(breakId);
	return [
		...tokens,
		// keep last 3 characters as they are
		text.slice(-3),
	];
};
