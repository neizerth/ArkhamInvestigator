import { nobr, splitTagFormatting, withTypography } from "./format";
import { haveWesternGlyphs } from "./glyphs";

type Options = {
	text: string;
	replaceBulletIcon?: boolean;
	replaceIcons?: boolean;
};
// const nbsp = 'N';
export const prepareText = ({
	text,
	replaceBulletIcon = true,
	replaceIcons = true,
}: Options) => {
	const typo = haveWesternGlyphs(text)
		? text
		: withTypography(text)
				.split("\n")
				.map(splitTagFormatting)
				.map(nobr)
				.join("\n");

	// change - mark to bullet icon
	const withBulletIcon = replaceBulletIcon
		? typo.replace(/(?<=^|\n)\s?[-−](?=\s)/g, "[bullet]")
		: typo;

	const content = withBulletIcon
		// markdown bold
		.replace(/\[\[([^\]]+)\]\]/g, "<keyword>$1</keyword>")
		// colon after icon symbol
		.replace(
			/(?<!\[)\[([^\]]+)\](?!\])(：)/g,
			'<icon icon="$1" zhColon />$2', // zh-colon-group
		);

	const withIcons = replaceIcons
		? content.replace(/\[([^\]]+)\]/g, '<icon icon="$1"/>')
		: content;

	const lines = withIcons.split("\n");
	const paragraphs =
		lines.length > 0 ? `<p>${lines.join("</p><p>")}</p>` : content;

	const result = `<content>${paragraphs}</content>`;

	return result;
};
