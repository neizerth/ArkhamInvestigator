import { nbsp } from "@shared/config";
import { haveChineseGlyphs, haveKoreanGlyphs } from "./glyphs";

// const nbsp = 'N';
export const prepareText = (text: string) => {
	const typo = withTypography(text).split("\n").map(nobr).join("\n");

	const content = typo
		// markdown bold
		.replace(/\[\[([^\]]+)\]\]/g, "<keyword>$1</keyword>")
		// icons
		.replace(/\[([^\]\[]+)\]/g, '<icon icon="$1"/>');

	const lines = content.split("\n");
	const paragraphs =
		lines.length > 0 ? `<p>${lines.join("</p><p>")}</p>` : content;

	const result = `<content>${paragraphs}</content>`;

	return result;
};

const withTypography = (text: string) => {
	const base = text
		// nbsp after icon or keyword
		.replaceAll("] ", `]${nbsp}`)
		// nbsp before digit
		.replace(/(?<!\])(\d+) /g, `$1${nbsp}`)
		// nbsp after digit
		.replace(/(\d+) /g, `$1${nbsp}`);

	const haveWesternGlyphs = haveChineseGlyphs(text) || haveKoreanGlyphs(text);

	if (haveWesternGlyphs) {
		return base;
	}

	return (
		base
			// dangling preposition
			.replace(/(?<=^|\s|\()[\p{L}]{1,3}(?=\s)/gu, `$&${nbsp}`)
			.replaceAll(`${nbsp} `, nbsp)
			.replaceAll(` ${nbsp}`, nbsp)
			// quotes
			.replace(/"([^"]+)"/g, "“$1”")
	);
};

// changes nbsp to <nobr>
const nobr = (text: string) => {
	let result = "";
	let token = "";
	let open = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (char === " " && !open) {
			result += `${token} `;
			token = "";
			continue;
		}
		if (char === nbsp) {
			if (!open) {
				open = true;
			}

			token += " ";
			continue;
		}
		if (char === " ") {
			if (open) {
				open = false;
				result += `<nobr>${token} </nobr>`;
				token = "";
			}
			continue;
		}

		token += char;
	}
	result += open ? `<nobr>${token}</nobr>` : token;

	return result.replace(/(<\/nobr>) /g, " $1");
};
