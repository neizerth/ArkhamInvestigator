import { Storage } from "@modules/core/storage/shared/lib";
import type { Translation } from "../../model";

const getKey = (language: string) => `118n.translations.${language}`;

export const StoreTranslation = {
	save: (language: string, data: Translation) => {
		const key = getKey(language);
		return Storage.save({
			key,
			data,
		});
	},
	load: (language: string) => {
		const key = getKey(language);
		return Storage.load<Translation>({
			key,
		});
	},
	exists: (language: string) => {
		const key = getKey(language);
		return Storage.has({
			key,
		});
	},
};
