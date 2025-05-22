import { stripTags } from "@shared/lib";

export const getReferenceCardDifficulty = (text: string) => {
	const [title] = text.split("\n");
	return stripTags(title);
};
