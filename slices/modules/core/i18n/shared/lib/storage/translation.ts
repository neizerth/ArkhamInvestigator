import { storage } from "@modules/core/storage/shared/config";
import type { Translation } from "../../model";

const key = "118n.translations";

export const saveStoreTranslation = (data: Translation) =>
	storage.save({ key, data });
export const loadStoreTranslation = () => storage.load({ key });
