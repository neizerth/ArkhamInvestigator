import { nbsp, shortNbsp } from "../../../../../config";
import { haveWesternGlyphs } from "../glyphs";

export const withTypography = (text: string) => {
	const base = text
		// nbsp after icon
		.replaceAll("([^]]]) ", `$1${nbsp}`)
		.replace(/(?<!\])\]([^\p{L}\]])/gu, `]${shortNbsp}$1`)
		// nbsp before digit
		.replace(/(?<!\])(\d+) /g, `$1${nbsp}`)
		// nbsp after digit
		.replace(/(\d+) /g, `$1${nbsp}`)
		// dot after ) or >
		.replace(/([\)\>])\./g, `$1${shortNbsp}.`)
		// add closing tag to img tags
		.replace(/<img([^>]*?)(?<!\/)>/g, "<img$1 />");

	if (haveWesternGlyphs(text)) {
		return base;
	}
	const extra = base
		// dangling preposition
		.replace(/(?<=^|\s|\()[\p{L}]{1,3}(?=\s)/gu, `$&${nbsp}`)
		.replaceAll(`${nbsp} `, nbsp)
		.replaceAll(` ${nbsp}`, nbsp)
		// quotes
		.replace(/"([^"]*)"/g, (match, p1, offset, string) => {
			// Do not replace quotes if preceded by =
			const before = string.slice(0, offset);
			if (/\=\s*$/.test(before)) {
				return match;
			}
			return `“${p1}”`;
		});

	return extra;
};
