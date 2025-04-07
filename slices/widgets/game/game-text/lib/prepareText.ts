import { nbsp, wordJoiner } from "@shared/config";
import { haveChineseGlyphs, haveKoreanGlyphs } from "./glyphs";

export const prepareText = (text: string) => {
	const content = withTypography(text)
		// markdown bold
		.replace(/\[\[([^\]]+)\]\]/g, "<keyword>$1</keyword>")
		// icons
		.replace(/\[([^\]\[]+)\]/g, '<icon icon="$1"/>')
		.replace(/\/>(\S)/g, `"/>${wordJoiner}$1`)
		.replace(/\/>(\s)/g, `"/>${nbsp}$1`);

	const lines = content.split("\n");
	const paragraphs =
		lines.length > 0 ? `<p>${lines.join("</p><p>")}</p>` : content;

	const result = `<content>${paragraphs}</content>`;

	return result;
};

const withTypography = (text: string) => {
	const base = text.replace(/(?<!\])(\d+) /g, `$1${nbsp}`);

	const haveWesternGlyphs = haveChineseGlyphs(text) || haveKoreanGlyphs(text);

	if (haveWesternGlyphs) {
		return base;
	}

	return (
		base
			.replace(/(?<=^|\s)[\p{L}]{1,3}(?=\s)/gu, "$&&nbsp;")
			.replaceAll("&nbsp; ", "&nbsp;")
			// quotes
			.replace(/"([^"]+)"/g, "“$1”")
	);
};
