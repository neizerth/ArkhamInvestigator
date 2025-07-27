import { nobr, splitTagFormatting, withTypography } from "./format";

// const nbsp = 'N';
export const prepareText = (text: string) => {
	const typo = withTypography(text)
		.split("\n")
		.map(splitTagFormatting)
		.map(nobr)
		.join("\n");

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
