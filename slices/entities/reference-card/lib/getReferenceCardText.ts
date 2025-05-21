import { stripTags } from "@shared/lib";

export const getReferenceCardText = (source: string) => {
	const text = source.split("\n").slice(1).join("\n");
	return stripTags(text);
};
