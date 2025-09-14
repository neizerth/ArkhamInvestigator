import { nobr, splitTagFormatting, withTypography } from "./format";
import { haveWesternGlyphs } from "./glyphs";

// const nbsp = 'N';
export const prepareText = (text: string) => {
	const typo = haveWesternGlyphs(text)
		? text
		: withTypography(text)
				.split("\n")
				.map(splitTagFormatting)
				.map(nobr)
				.join("\n");

	const content = typo
		// change - mark to bullet icon
		.replace(/(?<=^|\n)\s?[-−](?=\s)/g, "[bullet]")
		// markdown bold
		.replace(/\[\[([^\]]+)\]\]/g, "<keyword>$1</keyword>")
		// colon after icon symbol
		.replace(
			/(?<!\[)\[([^\]]+)\](?!\])(：)/g,
			'<icon icon="$1" zhColon />$2', // zh-colon-group
		)
		// icons
		.replace(/\[([^\]\[]+)\]/g, '<icon icon="$1"/>');

	const lines = content.split("\n");
	const paragraphs =
		lines.length > 0 ? `<p>${lines.join("</p><p>")}</p>` : content;

	const result = `<content>${paragraphs}</content>`;

	return result;
};
