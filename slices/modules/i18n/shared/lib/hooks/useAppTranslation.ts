import { useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANGUAGE } from "../../../config";
import { selectLanguage } from "../store/features/i18n/i18n";

type Args = Parameters<typeof useTranslation>;
export const useAppTranslation = (...args: Args) => {
	type TArgs = Parameters<typeof response.t>;
	const response = useTranslation(...args);
	const language = useAppSelector(selectLanguage);

	const translate = useCallback(
		(...args: TArgs) => {
			const translation = response.t(...args);
			const key = args[0];
			const translated = key !== translation;
			const translationLanguage = translated ? language : DEFAULT_LANGUAGE;

			return [translation, translationLanguage] as [string, string];
		},
		[language, response.t],
	);

	return {
		...response,
		translate,
	};
};
