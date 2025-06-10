import { getLocales } from "react-native-localize";
import { DEFAULT_LANGUAGE } from "../../../config";

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
