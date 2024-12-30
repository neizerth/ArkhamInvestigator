import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

export const DEFAULT_LANGUAGE = 'en';

export const DEFAULT_NAMESPACE = 'core';

export const CHINA_LANGUAGES = ['zh', 'zh-cn'];

export const i18n = createInstance();

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: DEFAULT_LANGUAGE,
		defaultNS: DEFAULT_NAMESPACE,
		react: {
			bindI18n: 'added loaded languageChanged',
			bindI18nStore: 'added',
		}
	});
