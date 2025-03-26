import { DEFAULT_LANGUAGE } from "@features/i18n/config";
import { getLocales } from "react-native-localize";

export const getDefaultLanguage = (availableLanguages?: string[]) => {
	const [locale] = getLocales();
	const { countryCode } = locale;
	const code = countryCode.toLowerCase();

	if (code.startsWith("en-")) {
		return "en";
	}
	if (code.startsWith("zh-")) {
		return "zh";
	}
	if (availableLanguages?.includes(code)) {
		return code;
	}
	return DEFAULT_LANGUAGE;
};
