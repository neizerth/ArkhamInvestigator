import { capitalize } from "@shared/lib";

export const getPhaseText = (text: string) => {
	const index = text.indexOf("(");
	const separatorIndex = index !== -1 ? index : text.length;
	const title = text.slice(0, separatorIndex).trim();
	const hintText = text
		.slice(separatorIndex)
		.replace(/[\(\)]/g, "")
		.trim();

	const hint = hintText && capitalize(hintText);

	return {
		title,
		hint,
	};
};
