import type { Translation } from "@features/i18n/model";
import { storage } from "@features/storage";

const key = "118n.translations";

export const saveStoreTranslation = (data: Translation) =>
	storage.save({ key, data });
export const loadStoreTranslation = () => storage.load({ key });
