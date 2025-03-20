import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

export const DEFAULT_LANGUAGE = "en";

export const I18N_NAMESAPCE = "core";

export const i18next = createInstance();

i18next.use(initReactI18next).init({
	fallbackLng: DEFAULT_LANGUAGE,
	defaultNS: I18N_NAMESAPCE,
	react: {
		bindI18n: "added loaded languageChanged",
		bindI18nStore: "added",
	},
});
