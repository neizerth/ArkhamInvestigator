import ru from "./ru.json";
import en from "./en.json";

type NameTranslations = {
	adjective: string[];
	noun: string[];
};

export const nameTranslations: Record<string, NameTranslations> = {
	en,
	ru,
};
