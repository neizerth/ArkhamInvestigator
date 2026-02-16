import ru from "./ru.json";
import en from "./en.json";

type NameTranslations = {
	prefix: string[];
	postfix: string[];
};

export const nameTranslations: Record<string, NameTranslations> = {
	en,
	ru,
};
