import { stripTags } from "@shared/lib";

export const getReferenceCardTitle = (text: string) => {
	const [title] = text.split("\n");
	return stripTags(title);
};
