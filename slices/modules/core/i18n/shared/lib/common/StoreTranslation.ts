import { Storage } from "@modules/core/storage/shared/lib";
import { DEFAULT_LANGUAGE } from "../../config";
import type { Translation } from "../../model";

type Language = string | null;
const getKey = (language: Language) =>
	`118n.translations.${language ?? DEFAULT_LANGUAGE}`;

export const StoreTranslation = {
	save: (language: Language, data: Translation) =>
		Storage.save({
			key: getKey(language),
			data,
		}),
	load: (language: Language) =>
		Storage.load<Translation>({
			key: getKey(language),
		}),
	exists: (language: Language) =>
		Storage.has({
			key: getKey(language),
		}),
};
