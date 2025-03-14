import type { Translation } from "@features/i18n/model";
import { storage } from "@features/storage";

const key = '118n.translations';

export const saveTranslation = (data: Translation) => storage.save({ key, data });
export const loadTranslation = () => storage.load({ key })