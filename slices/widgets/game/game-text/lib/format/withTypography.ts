import { nbsp } from "@shared/config";
import { haveChineseGlyphs, haveKoreanGlyphs } from "../glyphs";

export const withTypography = (text: string) => {
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
