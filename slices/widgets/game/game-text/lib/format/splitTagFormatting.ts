import { ElementType } from "domelementtype";
import htmlParse, { type DOMNode } from "html-dom-parser";

export const splitTagFormatting = (text: string) => {
	const result = htmlParse(text);

	const contents = result.map((node) => getTagContents(node)).join("");

	return contents;
};

const getTagContents = (node: DOMNode, prefix = "", postfix = "") => {
	if (node.type === ElementType.Text) {
		return node.data
			.split(" ")
			.map((word) => `${prefix}${word}${postfix}`)
			.join(" ");
	}
	if (node.type === ElementType.Tag) {
		const tag = node.name;
		const tagPrefix = `${prefix}<${tag}>`;
		const tagPostfix = `</${tag}>${postfix}`;

		return node.children
			.map((element): string => {
				const { type } = element;
				if (type === ElementType.Tag || type === ElementType.Text) {
					return getTagContents(element, tagPrefix, tagPostfix);
				}
				return "";
			})
			.join("");
	}
	return "";
};
